import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { kines } from '../data/kines.js'
import './SectionEquipe.css'

export default function SectionEquipe() {
  return (
    <section className="home-equipe" aria-labelledby="equipe-heading">
      <div className="home-equipe__inner container">
        <div className="home-equipe__header">
          <span className="home-equipe__label">Notre équipe</span>
          <h2 id="equipe-heading" className="home-equipe__title">
            Des professionnels à votre écoute
          </h2>
        </div>
        <div className="home-equipe__grid">
          {kines.map((kine) => (
            <Link
              to={`/equipe/${kine.id}`}
              key={kine.id}
              className="home-equipe__card"
            >
              <div className="home-equipe__photo">
                <img
                  src={kine.photo}
                  alt={`${kine.prenom} ${kine.nom}, ${kine.titre}`}
                  loading="lazy"
                />
              </div>
              <div className="home-equipe__info">
                <h3 className="home-equipe__name">
                  {kine.prenom} {kine.nom}
                </h3>
                <p className="home-equipe__titre">{kine.titre}</p>
                <p className="home-equipe__bio">{kine.bioCourte}</p>
                <span className="home-equipe__link">
                  Découvrir son profil <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
