// TarifsGeneraux.jsx
import PageHeader from "../components/PageHeader";
import "./Tarifs.css";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const ACTES = [
  {
    label: "Bilan-diagnostic kinésithérapique",
    tarif: "23,65 – 23,87 €",
    remb: "14,19 – 14,32 €",
  },
  {
    label:
      "Rééducation des conséquences des affections orthopédiques et rhumatologiques du rachis, du membre inférieur ou du membre supérieur",
    tarif: "17,83 – 17,97 €",
    remb: "10,70 – 10,78 €",
  },
  {
    label:
      "Rééducation des conséquences des affections orthopédiques et rhumatologiques de tout ou partie de plusieurs membres, ou du tronc et d'un ou plusieurs membres",
    tarif: "20,97 – 21,02 €",
    remb: "12,58 – 12,61 €",
  },
  {
    label:
      "Rééducation analytique et globale, musculo-articulaire des deux membres inférieurs, de la posture, de l'équilibre et de la coordination chez le sujet âgé",
    tarif: "18,79 €",
    remb: "11,27 €",
  },
  {
    label: "Rééducation de l'hémiplégie",
    tarif: "19,89 €",
    remb: "11,93 €",
  },
  {
    label: "Rééducation abdominale du post-partum",
    tarif: "17,68 €",
    remb: "10,60 €",
  },
  {
    label: "Rééducation des affections neurologiques stables ou évolutives",
    tarif: "18,81 – 24,31 €",
    remb: "11,28 – 14,58 €",
  },
  {
    label: "Rééducation des conséquences des affections respiratoires",
    tarif: "18,79 – 22,10 €",
    remb: "11,27 – 13,26 €",
  },
  {
    label: "Déplacement à domicile",
    sub: "En plus du prix de l'acte",
    tarif: "+ 2,50 – 4,00 €",
    remb: "+ 1,50 – 2,40 €",
  },
];

const DESCRIPTION = [
  "Nous pratiquons des honoraires conformes aux tarifs conventionnés de la sécurité sociale, établis par la CPAM. Ces tarifs font l'objet d'un remboursement partiel par l'Assurance Maladie, selon les taux indiqués ci-dessous.",
  "Certaines spécialités peuvent appliquer des tarifs différents de ceux listés ici. Consultez la page de la spécialité concernée pour connaître les tarifs qui s'appliquent à votre situation.",
  "Pour tout acte réalisé avec ordonnance — hors ALD et déplacements à domicile — un dépassement de 3 € par séance est appliqué. Ce dépassement n'est pas remboursé par l'Assurance Maladie. Il reflète les investissements continus en formation et spécialisation nécessaires à des soins de qualité, dans un contexte où les tarifs conventionnés ne suivent plus l'évolution du coût de la vie.",
  "En cas d'empêchement, merci de nous prévenir au minimum 48 heures avant l'heure prévue afin que votre créneau puisse être proposé à un autre patient. En cas de non-respect, la séance pourra être comptabilisée.",
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function TarifsGeneraux() {
  return (
    <>
      <PageHeader
        label="Syndicat National des Masseurs-Kinésithérapeutes-Rééeducateurs · Conventionnés"
        title="Tarifs généraux"
        teaser="Retrouvez l'ensemble de nos tarifs conventionnés et informations pratiques."
        description={DESCRIPTION}
      />

      <main className="tarifs container">
        {/* ── NOTICE SPÉCIALITÉS ── */}
        <div className="tarifs__notice">
          <span className="tarifs__notice-icon" aria-hidden="true">
            ℹ
          </span>
          <p>
            Les tarifs présentés ici sont les tarifs généraux du cabinet.{" "}
            <strong>
              Certaines spécialités peuvent appliquer des tarifs spécifiques.
            </strong>{" "}
            Consultez la page de la spécialité concernée pour connaître les
            tarifs qui s'appliquent à votre situation.
          </p>
        </div>

        {/* ── ACTES REMBOURSÉS ── */}
        <section>
          <div className="tarifs__section-header">
            <h2>Actes remboursés</h2>
            <div className="tarifs__section-line" />
            <span className="tarifs__section-badge">
              Hors franchise médicale *
            </span>
          </div>

          <div className="tarifs__table-card">
            <table>
              <thead>
                <tr>
                  <th>Acte</th>
                  <th>Tarif</th>
                  <th>Remboursement Assurance Maladie</th>
                </tr>
              </thead>
              <tbody>
                {ACTES.map((acte, i) => (
                  <tr key={i}>
                    <td>
                      {acte.label}
                      {acte.sub && (
                        <span className="tarifs__sub">{acte.sub}</span>
                      )}
                    </td>
                    <td>
                      <span className="tarifs__prix">{acte.tarif}</span>
                    </td>
                    <td>
                      <span className="tarifs__remb">{acte.remb}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── INFOS PRATIQUES ── */}
        <section>
          <div className="tarifs__section-header">
            <h2>Informations pratiques</h2>
            <div className="tarifs__section-line" />
          </div>

          <div className="tarifs__cards-grid">
            {/* Dépassement */}
            <div className="tarifs__card tarifs__card--accent">
              <div className="tarifs__card-icon">+3 €</div>
              <h3>Dépassement d'honoraires</h3>
              <p>
                Un dépassement de <strong>3 € par séance</strong> est appliqué
                pour tout acte avec ordonnance,{" "}
                <strong>hors ALD et déplacements à domicile</strong>.
                <br />
                <br />
                Les tarifs conventionnés établis par la CPAM ne correspondent
                plus aux moyens mis en œuvre pour des soins de qualité, et ne
                suivent plus depuis longtemps l'évolution du coût de la vie.
              </p>
              <span className="tarifs__card-tag">
                Non remboursé par l'Assurance Maladie
              </span>
            </div>

            {/* Rendez-vous */}
            <div className="tarifs__card tarifs__card--primary">
              <div className="tarifs__card-icon">🗓</div>
              <h3>Annulation de rendez-vous</h3>
              <p>
                Merci de nous prévenir <strong>le plus tôt possible</strong>{" "}
                (minimum 48 heures avant l'heure prévue) pour tout empêchement.
                Votre place pourra ainsi être utilisée par un autre patient en
                attente de soins.
                <br />
                <br />
                <strong>En cas de non-respect</strong>, la séance pourra être
                comptabilisée.
              </p>
            </div>
          </div>
        </section>

        {/* ── NOTE LÉGALE ── */}
        <div className="tarifs__note">
          <p>
            * <em>Hors franchise médicale</em>. <br /> Votre professionnel de
            santé pratique des honoraires conformes aux tarifs de la sécurité
            sociale. Ces tarifs ne peuvent être dépassés, sauf en cas d'exigence
            exceptionnelle de votre part concernant l'horaire ou le lieu des
            actes pratiqués, ou en cas de non-respect du parcours de soins. Dans
            ce cas, leur montant doit cependant être déterminé avec tact et
            mesure. La facturation de dépassements d'honoraires est par ailleurs
            interdite pour les bénéficiaires de la couverture maladie
            universelle complémentaire (CMU-C), et de l'aide au paiement d'une
            complémentaire santé (ACS).
          </p>
          <p>
            Seuls peuvent vous être facturés des frais correspondant à une
            prestation de soins rendue. Le paiement d'une prestation qui ne
            correspond pas directement à une prestation de soins ne peut vous
            être imposé.
          </p>
          <p>
            Votre professionnel de santé doit obligatoirement vous informer
            avant de réaliser un acte non remboursé par la sécurité sociale. En
            outre, dès lors que les dépassements d'honoraires des actes et
            prestations facturés atteignent 70 €, votre professionnel doit vous
            en informer par écrit, préalablement à la réalisation de la
            prestation.
          </p>
        </div>

        {/* ── SIGNATURE ── */}
        <div className="tarifs__signature">
          Merci de votre compréhension,
          <strong>Justine &amp; Johan HEGGEN</strong>
        </div>
      </main>
    </>
  );
}
