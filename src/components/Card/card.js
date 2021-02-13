import { useCallback, useEffect, useState } from 'react';
import './card.css'

function Card({ img, nombre, precio, descuento}) {

    return (
        <a className="card dim" href="*">
            <img src={img} className="card-img-top img-dim" alt="..."/>
            <div className="card-body">
                <h6 className="card-title">{nombre}</h6>
                { descuento === 0 ? 
                    <p className="card-text">${precio}</p>
                :
                    <div className="style-1">
                        <del>
                            <span className="amount">{precio}</span>
                        </del>
                        <ins>
                            <span className="amount">{descuento}</span>
                        </ins>
                    </div>
                }
                
            </div>
        </a>
    );
}
  
export default Card;