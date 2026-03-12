import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, CreditCard } from "lucide-react";
import { cabinet } from "../data/cabinet.js";
import "./SectionCTA.css";

export default function SectionCTA() {
  return (
    <section className="cta" aria-labelledby="cta-heading">
      <div className="cta__inner container">
        <div className="cta__content">
          <h2 id="cta-heading" className="cta__title">
            Prenez soin de vous
          </h2>
          <p className="cta__description">
            {
              "N'hésitez pas à nous contacter pour prendre rendez-vous ou pour toute question sur nos prises en charge. Nous sommes à votre écoute."
            }
          </p>
          <Link to="/kine-heggen/contact" className="cta__btn">
            <span>Nous contacter</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {/*
          ✅ <aside> : les infos pratiques (horaires, adresse, paiement)
             sont du contenu complémentaire à la section principale (le CTA).
             <aside> dans un <section> = contenu lié mais tangentiel — usage correct.
        */}
        <aside className="cta__infos" aria-label="Informations pratiques">
          {/* ── Horaires ── */}
          <div className="cta__info-card">
            <Clock size={20} aria-hidden="true" />
            {/*
              ✅ <dl>/<dt>/<dd> : sémantique de liste de définitions.
                 C'est exactement le bon élément pour des paires
                 clé/valeur comme "Horaires : Lundi-Vendredi 8h-19h".
                 Bien compris par schema.org et les crawlers.
            */}
            <dl className="cta__info-dl">
              <dt>Horaires</dt>
              <dd>
                {/*
                  ✅ <time> avec datetime machine-readable :
                     les heures d'ouverture sont des données temporelles.
                     Format datetime HH:MM est valide pour <time>.
                */}
                Lundi – Vendredi, <time dateTime="08:00">8h00</time>
                {" – "}
                <time dateTime="19:00">19h00</time>
              </dd>
            </dl>
          </div>

          {/* ── Adresse ── */}
          <div className="cta__info-card">
            <MapPin size={20} aria-hidden="true" />
            {/*
              ✅ <address> : élément HTML5 pour les coordonnées
                 de contact d'une organisation.
                 Aide les parsers schema.org LocalBusiness.
                 font-style: normal appliqué en CSS pour neutraliser
                 l'italique par défaut du navigateur.
            */}
            <address className="cta__info-address">
              <strong>{cabinet.adresse.rue}</strong>
              <span>
                {cabinet.adresse.codePostal} {cabinet.adresse.ville}
              </span>
            </address>
          </div>

          {/* ── Paiement ── */}
          <div className="cta__info-card">
            <CreditCard size={20} aria-hidden="true" />
            <dl className="cta__info-dl">
              <dt>Cabinet conventionné</dt>
              <dd>{cabinet.moyensPaiement.join(", ")}</dd>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
