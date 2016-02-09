import React from 'react';

export default function heart() {
  return (
    <svg style={{position:'absolute', marginLeft: '-100%', display: 'none'}}>
    <path id="heart-icon" d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13.159-10.399,14-0.454c1.011-9.938,14-8.903,14,0.454
    	C30,20.335,16,28.261,16,28.261z" />
     <filter id='inset-shadow'>
        <feOffset
                dx='0'
                dy='0'
              />
        <feGaussianBlur
                stdDeviation='1'
                result='offset-blur'
              />
        <feComposite
                operator='out'
                in='SourceGraphic'
                in2='offset-blur'
                result='inverse'
              />
        <feFlood
                flood-color='black'
                flood-opacity='.95'
                result='color'
              />
        <feComposite
                operator='in'
                in='color'
                in2='inverse'
                result='shadow'
              />
        <feComposite
                operator='over'
                in='shadow'
                in2='SourceGraphic'
              />
      </filter>
        </svg>);
}