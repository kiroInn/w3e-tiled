const fs = require('fs');
const _ = require('lodash');
const sizeOf = require('image-size');
const { TERRAINS, TILE_INDEX_LARGE, TILE_INDEX_SMALL } = require('./config/index');
const w3eData = require('./test/w3e.json');

function writeTmx(data) {
	const { _environment } = data;
	const { mainTileset, maxX, maxY, groundTilesets } = _environment;
	const useTerrains = _.map(groundTilesets, (key, index) => {
		return { ..._.find(TERRAINS[mainTileset], (terrain) => terrain.key === key), order: index };
	});
	let { tilesetsData } = _environment;
	tilesetsData = _.map(tilesetsData, (row) => {
		return _.map(row, (item) => {
			const { gVariation } = item;
			return { ...item, gVariation: gVariation % 16 };
		});
	});
	const layerData = _.reverse(tilesetsData);
	const useTerrain = findUseTerrainType(tilesetsData);

	const terrains = _.filter(useTerrains, (terrain) => {
		return _.includes(useTerrain, terrain.order);
	});
	const tileSet = `
        ${getDefaultTileSet()}
        ${_.map(terrains, (terrain, index) => {
			const { res } = terrain;
			const dimensions = sizeOf(`${__dirname}/res/Ruins/${res}.png`);
			const count = dimensions.width / 64 * dimensions.height / 64;
			const columns = dimensions.width / 64;
			return `
        <tileset firstgid="${(index + 1) * 32 + 1}" name="${res}" tilewidth="64" 
            tileheight="64" tilecount="${count}" columns="${columns}">
        <image source="res/Ruins/${res}.png" trans="ff00ff" width="${dimensions.width}" height="${dimensions.height}"/>
       </tileset>`;
		}).join(' ')}`;
	const layers = _.map(terrains, (terrain, index) => {
		const { order, res } = terrain;
		const dimensions = sizeOf(`${__dirname}/res/Ruins/${res}.png`);
		const mapData = _.map(layerData, (row) => {
			return _.map(row, (column) => {
				const { gVariation } = column;
				return gVariation === order ? order : 0;
			});
		});
		const layerCsv = _.map(mapData, (row, rowIdx) => {
			return _.map(row, (column, columIndex) => {
				const firstGid = (index + 1) * 32;
				const realValue = getTileValue(
					mapData,
					rowIdx,
					columIndex,
					dimensions.width === 512 ? TILE_INDEX_LARGE : TILE_INDEX_SMALL,
					index
				);
				return realValue === 0 ? 0 : firstGid + realValue;
			});
		});
		return `<layer name="Layer-${index + 1}" width="${maxY}" height="${maxX}">
        <data encoding="csv">
        ${layerCsv}
        </data>
        </layer>
        `;
	});
	const DIST_FOLDER = `${__dirname}`;
	!fs.existsSync(DIST_FOLDER) && fs.mkdirSync(DIST_FOLDER, { recursive: true });
	fs.writeFileSync(`${DIST_FOLDER}/w3e.tmx`, writeTmxBody(maxY, maxX, tileSet, layers));
}
writeTmx(w3eData);

function findUseTerrainType(tilesetsData) {
	let result = [];
	_.forEach(tilesetsData, (row) => {
		result = _.concat(
			result,
			_.union(
				_.map(row, (item) => {
					const { gVariation } = item;
					return gVariation;
				})
			)
		);
	});
	return _.union(result);
}

function getTileValue(layerData, rowIdx, columIdx, TILED_INDEX, index) {
	const tl = _.get(layerData, `[${rowIdx}][${columIdx}]`, 0) > 0 ? 2 : 0;
	const tr = _.get(layerData, `[${rowIdx}][${columIdx + 1}]`, 0) > 0 ? 1 : 0;
	const bl = _.get(layerData, `[${rowIdx + 1}][${columIdx}]`, 0) > 0 ? 8 : 0;
	const br = _.get(layerData, `[${rowIdx + 1}][${columIdx + 1}]`, 0) > 0 ? 4 : 0;
	if (tl === 0 && tr === 0 && bl === 0 && br === 0) {
		return 0;
	}
	return _.indexOf(TILED_INDEX, tl + tr + bl + br) + 1;
}

function getDefaultTileSet() {
	const res = 'Ruins_Grass';
	const dimensions = sizeOf(`${__dirname}/res/Ruins/${res}.png`);
	const count = dimensions.width / 64 * dimensions.height / 64;
	const columns = dimensions.width / 64;
	return `<tileset firstgid="1" name="${res}" tilewidth="64" 
    tileheight="64" tilecount="${count}" columns="${columns}">
<image source="res/Ruins/Ruins_Grass.png" trans="ff00ff" width="${dimensions.width}" height="${dimensions.height}"/>
</tileset>`;
}
function getDefaultLayer(maxX, maxY) {
	return `<layer name="Layer-0" width="${maxX}" height="${maxY}">
            <data encoding="csv">
            ${_.range(maxX * maxY).map(
				() => _.indexOf(TILE_INDEX_LARGE, _.random(0, 16) > 14 ? _.random(0, 16) + 15 : 15) + 1
			)}
        </data>
   </layer>`;
}
function writeTmxBody(maxX, maxY, tileSet, layers) {
	return `<?xml version="1.0" encoding="UTF-8"?>
    <map version="1.0" orientation="orthogonal" renderorder="right-down" width="${maxX}" height="${maxY}" tilewidth="64" tileheight="64" nextobjectid="1">
    ${tileSet}
    ${getDefaultLayer(maxX, maxY)}
      ${layers}
    </map>
    `;
}
