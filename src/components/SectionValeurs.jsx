import { Ear, GraduationCap, Heart } from 'lucide-react'
import { cabinet } from '../data/cabinet.js'
import './SectionValeurs.css'

const iconMap = {
  ear: Ear,
  diploma: GraduationCap,
  heart: Heart,
}

export default function SectionValeurs() {
  return (
    <section className="valeurs" aria-labelledby="valeurs-heading">
      <div className="valeurs__inner container">
        <div className="valeurs__header">
          <span className="valeurs__label">Nos valeurs</span>
          <h2 id="valeurs-heading" className="valeurs__title">
            Ce qui nous anime au quotidien
          </h2>
        </div>
        <div className="valeurs__grid">
          {cabinet.valeurs.map((valeur, i) => {
            const Icon = iconMap[valeur.icone] || Heart
            return (
              <article key={i} className="valeurs__card">
                <div className="valeurs__icon" aria-hidden="true">
                  <Icon size={28} />
                </div>
                <h3 className="valeurs__card-title">{valeur.titre}</h3>
                <p className="valeurs__card-desc">{valeur.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
