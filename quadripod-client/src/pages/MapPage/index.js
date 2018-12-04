import React, { Component } from 'react'

import { map, range } from 'lodash'

import { encode, decode } from '../../helpers/blecoding'

import { MapContainer, MapCellBlocked, MapCellUnknown, MapCellFree } from '../../components/Style/Map'

class MapPage extends Component {

	state = {
		mapSize: 24,
		mapData: 'uuuuuuuuuuuuuuuuuuuuuuuu'+
			'bfffffbbfffffffffffffffb'+
			'bffffffffffffffffffffffb'+
			'bfffffffbubffffffffffffb'+
			'bfffffffbuuubffffffffffb'+
			'bfffffffffbuuuubfffffffb'+
			'bfffffffffffbbfffffffffb'+
			'bfffffffffffbbfffffffffb'+
			'bfffbbfffffffffffffffffb'+
			'bfbuuubfffffffffffffbuuu'+
			'bfffffffffffbbffffffffub'+
			'bfffffffffffbbfffffffffb'+
			'bfffffffffffbbfffffffffb'+
			'bfbbbbbfffffbbffffffffub'+
			'bfbuuubfffffffffffffbuuu'+
			'bfbuuubfffffffffffffbuuu'+
			'bfbuuubfffffffffffffbuuu'+
			'bfbuuubfffffffffffffbuuu'+
			'bfbuuubfffffffffffffbuuu'+
			'bfbbbbbfffffffffffffbuuu'+
			'bfffffffffffffffffbuuuuu'+
			'bfffffffffffffffffbuuuuu'+
			'bfffffffffffffffffbuuuuu'+
			'uuuuuuuuuuuuuuuuuuuuuuuu'
	}

	renderIndex(index, mapData2) {
		const { mapData } = this.state

		if (mapData2[index] == 'f') {
			return <MapCellFree />
		}

		if (mapData2[index] == 'u') {
			return <MapCellUnknown />
		}

		return <MapCellBlocked />
	}	

	render() {
		const { mapSize, mapData } = this.state

		const mapData2 = decode(encode(mapData))

		return <MapContainer>
			{ map(range(0, mapSize), line => {
				const startIndex = line*mapSize
				const endIndex = startIndex + mapSize
				return (<tr key={Math.random()}>
					{ map(range(startIndex, endIndex), index => this.renderIndex(index, mapData2))}
				</tr>)
			})}
		</MapContainer>
	}
}

export default MapPage
