import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Database,
  Lock,
  Eye,
  Scale,
  Mail,
} from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import { kines } from "../data/kines.js";
import PageHeader from "../components/PageHeader.jsx";
import "./MentionsLegales.css";

const HEBERGEUR = {
  nom: "OVHcloud",
  adresse: "2 rue Kellermann - 59100 Roubaix - France",
  siteWeb: "https://www.ovhcloud.com/",
};

const DEVELOPPEUR = {
  nom: "Christian HUMBERT",
  qualite: "Développeur web",
  email: "chrstn.hmbrt67@outlook.com",
  siteWeb: "https://www.linkedin.com/in/christian-humbert-developpeur-web/",
};

const sections = [
  { id: "editeur", label: "Éditeur du site", Icon: FileText },
  { id: "hebergeur", label: "Hébergeur", Icon: Database },
  { id: "developpeur", label: "Conception", Icon: Shield },
  { id: "propriete", label: "Propriété", Icon: Scale },
  { id: "donnees", label: "Données personnelles", Icon: Lock },
  { id: "cookies", label: "Cookies", Icon: Eye },
  { id: "responsabilite", label: "Responsabilité", Icon: Shield },
  { id: "droit", label: "Droit applicable", Icon: Scale },
];

const updateDate = new Date().toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function MentionsLegales() {
  const adresse = cabinet.adresse;

  useEffect(() => {
    document.title = `Mentions légales — ${cabinet.nom}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="mentions" id="main-content">
      <PageHeader
        label="Informations légales"
        title="Mentions légales"
        teaser={
          "Conformément à la loi n° 2004‑575 du 21 juin 2004 pour la confiance " +
          "dans l'économie numérique (LCEN), retrouvez ici l'ensemble des " +
          "informations légales relatives à ce site."
        }
        meta={`Dernière mise à jour : ${updateDate}`}
      />

      <div className="mentions__layout container">
        {/* ── Sommaire (sticky) ── */}
        <aside className="mentions__sidebar" aria-label="Sommaire de la page">
          <nav className="mentions__nav">
            <p className="mentions__nav-title">Sommaire</p>
            <ol className="mentions__nav-list">
              {sections.map(({ id, label, Icon }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="mentions__nav-link"
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* ── Contenu principal ── */}
        <div className="mentions__content">
          {/* 1. Éditeur */}
          <section
            className="mentions__section"
            id="editeur"
            aria-labelledby="editeur-heading"
          >
            <div className="mentions__section-header">
              <FileText
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="editeur-heading" className="mentions__section-title">
                1. Éditeur du site
              </h2>
            </div>
            <div className="mentions__card">
              <dl className="mentions__dl">
                <div className="mentions__dl-row">
                  <dt>Dénomination</dt>
                  <dd>{cabinet.nom}</dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Forme juridique</dt>
                  <dd>Cabinet libéral de kinésithérapie</dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Adresse</dt>
                  <dd>
                    {adresse.rue}, {adresse.codePostal} {adresse.ville}
                  </dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Téléphone</dt>
                  <dd>
                    <a href={`tel:${cabinet.telephone[0].replace(/\s/g, "")}`}>
                      {cabinet.telephone[0]}
                    </a>
                  </dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>E-mail</dt>
                  <dd>
                    <a href={`mailto:${cabinet.email}`}>{cabinet.email}</a>
                  </dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>N° ADELI / RPPS</dt>
                  <dd>
                    {kines.map((k, i) => (
                      <span key={k.id}>
                        {k.prenom} {k.nom} : {k.numeroAdeli ?? "à compléter"}
                        {i < kines.length - 1 && " — "}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Ordre professionnel</dt>
                  <dd>
                    Conseil National de l'Ordre des Masseurs-Kinésithérapeutes
                    (CNOMK) —{" "}
                    <a
                      href="https://www.ordremk.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ordremk.fr
                    </a>
                  </dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Régime conventionnel</dt>
                  <dd>Cabinet conventionné secteur 1 (Assurance Maladie)</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* 2. Hébergeur */}
          <section
            className="mentions__section"
            id="hebergeur"
            aria-labelledby="hebergeur-heading"
          >
            <div className="mentions__section-header">
              <Database
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="hebergeur-heading" className="mentions__section-title">
                2. Hébergeur du site
              </h2>
            </div>
            <div className="mentions__card">
              <dl className="mentions__dl">
                <div className="mentions__dl-row">
                  <dt>Société</dt>
                  <dd>{HEBERGEUR.nom}</dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Siège social</dt>
                  <dd>{HEBERGEUR.adresse}</dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Site web</dt>
                  <dd>
                    <a
                      href={HEBERGEUR.siteWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {HEBERGEUR.siteWeb}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* 3. Développeur */}
          <section
            className="mentions__section"
            id="developpeur"
            aria-labelledby="developpeur-heading"
          >
            <div className="mentions__section-header">
              <Shield
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="developpeur-heading" className="mentions__section-title">
                3. Conception & développement
              </h2>
            </div>
            <div className="mentions__card">
              <dl className="mentions__dl">
                <div className="mentions__dl-row">
                  <dt>Identité</dt>
                  <dd>{DEVELOPPEUR.nom}</dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Qualité</dt>
                  <dd>{DEVELOPPEUR.qualite}</dd>
                </div>
                <div className="mentions__dl-row">
                  <dt>Contact</dt>
                  <dd>
                    <a href={`mailto:${DEVELOPPEUR.email}`}>
                      {DEVELOPPEUR.email}
                    </a>
                  </dd>
                </div>
                {DEVELOPPEUR.siteWeb && (
                  <div className="mentions__dl-row">
                    <dt>Profil</dt>
                    <dd>
                      <a
                        href={DEVELOPPEUR.siteWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </section>

          {/* 4. Propriété intellectuelle */}
          <section
            className="mentions__section"
            id="propriete"
            aria-labelledby="propriete-heading"
          >
            <div className="mentions__section-header">
              <Scale
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="propriete-heading" className="mentions__section-title">
                4. Propriété intellectuelle
              </h2>
            </div>
            <div className="mentions__card mentions__card--text">
              <p>
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les représentations iconographiques et
                photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur quelque support
                que ce soit est formellement interdite sauf autorisation
                expresse du directeur de la publication. Toute reproduction non
                autorisée constitue une contrefaçon susceptible d'entraîner des
                sanctions civiles et pénales prévues aux articles L.335‑2 et
                suivants du Code de la propriété intellectuelle.
              </p>
              <p>
                Les marques, logos, noms de domaine et autres signes distinctifs
                reproduits sur ce site sont la propriété exclusive de leurs
                titulaires respectifs et ne peuvent être utilisés sans leur
                accord préalable.
              </p>
            </div>
          </section>

          {/* 5. Données personnelles */}
          <section
            className="mentions__section"
            id="donnees"
            aria-labelledby="donnees-heading"
          >
            <div className="mentions__section-header">
              <Lock
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="donnees-heading" className="mentions__section-title">
                5. Protection des données personnelles (RGPD)
              </h2>
            </div>
            <div className="mentions__card mentions__card--text">
              <p>
                Conformément au Règlement (UE) 2016/679 du 26 avril 2016 (RGPD)
                et à la loi n° 78‑17 du 6 janvier 1978 modifiée relative à
                l'informatique, aux fichiers et aux libertés, les informations
                suivantes vous sont communiquées.
              </p>

              <h3 className="mentions__subheading">Données collectées</h3>
              <p>
                Ce site est un site vitrine entièrement statique. Il ne comporte
                ni formulaire de contact, ni espace membre, ni outil de tracking
                ou d'analyse d'audience.{" "}
                <strong>
                  Aucune donnée personnelle n'est collectée, traitée ou stockée
                </strong>{" "}
                via ce site internet.
              </p>
              <p>
                Les seules données susceptibles d'être enregistrées sont des
                données techniques de navigation (adresse IP, navigateur, pages
                consultées) conservées dans les journaux d'accès de l'hébergeur
                ({HEBERGEUR.nom}) à des fins de sécurité et de diagnostic,
                conformément à leur propre politique de confidentialité.
              </p>

              <h3 className="mentions__subheading">Données de santé</h3>
              <p>
                Les données médicales et de santé des patients sont traitées
                exclusivement dans le cadre de la relation thérapeutique, sous
                couvert du secret médical et de la réglementation relative aux
                données de santé (article L.1111‑8 du Code de la santé
                publique). Elles ne transitent en aucun cas par ce site
                internet.
              </p>

              <h3 className="mentions__subheading">Exercice de vos droits</h3>
              <p>
                Bien qu'aucune donnée personnelle ne soit collectée par ce site,
                vous pouvez exercer vos droits d'accès, de rectification,
                d'opposition et d'effacement (prévus aux articles 15 à 22 du
                RGPD) en contactant directement le cabinet :{" "}
                <a href={`mailto:${cabinet.email}`}>{cabinet.email}</a>.
              </p>
              <p>
                En cas de réclamation, vous avez le droit d'introduire une
                plainte auprès de la{" "}
                <strong>
                  Commission Nationale de l'Informatique et des Libertés (CNIL)
                </strong>{" "}
                —{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.cnil.fr
                </a>{" "}
                — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
              </p>
            </div>
          </section>

          {/* 6. Cookies */}
          <section
            className="mentions__section"
            id="cookies"
            aria-labelledby="cookies-heading"
          >
            <div className="mentions__section-header">
              <Eye
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="cookies-heading" className="mentions__section-title">
                6. Cookies
              </h2>
            </div>
            <div className="mentions__card mentions__card--text">
              <p>
                Ce site n'utilise <strong>aucun cookie</strong>, qu'il soit
                technique, analytique, publicitaire ou de profilage.
              </p>
              <p>
                Aucun traceur n'est déposé sur votre terminal lors de votre
                visite. Vous n'avez donc aucune action à effectuer et aucun
                consentement n'est requis au sens de l'article 82 de la loi
                Informatique et Libertés.
              </p>
              <p>
                L'hébergeur ({HEBERGEUR.nom}) peut de son côté enregistrer des
                données techniques dans ses journaux d'accès (logs serveur) à
                des fins de sécurité. Ces traitements relèvent de sa propre
                politique de confidentialité, consultable sur{" "}
                <a
                  href={HEBERGEUR.siteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {HEBERGEUR.siteWeb}
                </a>
                .
              </p>
            </div>
          </section>

          {/* 7. Responsabilité */}
          <section
            className="mentions__section"
            id="responsabilite"
            aria-labelledby="responsabilite-heading"
          >
            <div className="mentions__section-header">
              <Shield
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2
                id="responsabilite-heading"
                className="mentions__section-title"
              >
                7. Limitation de responsabilité
              </h2>
            </div>
            <div className="mentions__card mentions__card--text">
              <p>
                Les informations disponibles sur ce site sont fournies à titre
                indicatif. Elles ne constituent pas des conseils médicaux ou
                thérapeutiques et ne sauraient se substituer à une consultation
                auprès d'un professionnel de santé qualifié.
              </p>
              <p>
                L'éditeur s'efforce de maintenir les informations publiées
                exactes et à jour, mais ne peut garantir leur exhaustivité ni
                leur actualité. L'éditeur décline toute responsabilité en cas
                d'erreur ou d'omission.
              </p>
              <p>
                L'éditeur ne saurait être tenu responsable des dommages directs
                ou indirects résultant de l'accès ou de l'utilisation de ce
                site, y compris en cas d'inaccessibilité temporaire.
              </p>
              <p>
                Ce site peut contenir des hyperliens vers des sites tiers. Ces
                liens sont fournis à titre informatif uniquement. L'éditeur
                n'exerce aucun contrôle sur ces sites et décline toute
                responsabilité quant à leur contenu.
              </p>
            </div>
          </section>

          {/* 8. Droit applicable */}
          <section
            className="mentions__section"
            id="droit"
            aria-labelledby="droit-heading"
          >
            <div className="mentions__section-header">
              <Scale
                size={20}
                className="mentions__section-icon"
                aria-hidden="true"
              />
              <h2 id="droit-heading" className="mentions__section-title">
                8. Droit applicable et juridiction compétente
              </h2>
            </div>
            <div className="mentions__card mentions__card--text">
              <p>
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige relatif à leur interprétation ou à
                leur exécution, et à défaut d'accord amiable, les tribunaux
                français seront seuls compétents.
              </p>
              <p>
                Toute réclamation relative à l'utilisation de ce site peut être
                adressée à l'éditeur aux coordonnées mentionnées à la section 1.
              </p>
            </div>
          </section>

          {/* CTA contact */}
          <div
            className="mentions__contact-cta"
            role="complementary"
            aria-label="Nous contacter"
          >
            <p className="mentions__contact-cta-text">
              Une question concernant ces mentions légales ?
            </p>
            <Link to="/contact" className="mentions__contact-btn">
              <Mail size={16} aria-hidden="true" />
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
