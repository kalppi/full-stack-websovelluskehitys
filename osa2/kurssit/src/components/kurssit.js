import React from 'react';

const Otsikko = ({nimi}) => {
	return <h1>{nimi}</h1>
}

const Osa = ({osa}) => {
	return <p>{osa.nimi} {osa.tehtavia}</p>
}

const Sisalto = ({osat}) => {
	const yht = osat.reduce((y, i) => y + i.tehtavia , 0);

	return (
		<div>
		{
			osat.map(osa => {
				return <Osa osa={osa} key={osa.id} />
			})
		}
		<p>yhteensä {yht} tehtävää</p>
	</div>)
}

const Kurssi = ({kurssi}) => {
	return <div>
		<Otsikko nimi={kurssi.nimi} />
		<Sisalto osat={kurssi.osat} />
	</div>		
}

const Kurssit = ({kurssit}) => {
	return kurssit.map(kurssi => {
		return <Kurssi kurssi={kurssi} key={kurssi.id} />
	});
}

export default Kurssit