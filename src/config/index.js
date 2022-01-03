const TILE_INDEX_SMALL = [ 0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15 ];
const TILE_INDEX_LARGE = [
	0,
	4,
	8,
	12,
	16,
	20,
	24,
	28,
	1,
	5,
	9,
	13,
	17,
	21,
	25,
	29,
	2,
	6,
	10,
	14,
	18,
	22,
	26,
	30,
	3,
	7,
	11,
	15,
	19,
	23,
	27,
	31
];
const TERRAINS = {
	Z: [
		{
			key: 'Zdtr',
			res: 'Ruins_DirtRough',
			order: 1,
			convert: 'Ldro,Fdro,Wdro,Bdsd,Adrd,Cdrd,Ndrd,Ydtr,Vdrr,Qdrr,Xdtr,Dbrk,Gbrk,Idtr,Odtr'
		},
		{
			key: 'Zdrt',
			res: 'Ruins_Dirt',
			order: 2,
			convert: 'Ldrt,Fdrt,Wdrt,Bdsr,Adrt,Cdrt,Ndrt,Vdrt,Qdrt,Ydrt,Xdrt,Ddrt,Gdrt,Idrt,Odrt'
		},
		{
			key: 'Zdrg',
			res: 'Ruins_DirtGrass',
			order: 3,
			convert: 'Ldrg,Fdrg,Wsng,Bdrg,Adrg,Clvg,Nice,Ygsb,Vgrt,Qgrt,Xgsb,Dgrs,Ggrs,Idtr,Ofsl'
		},
		{
			key: 'Zbks',
			res: 'Ruins_SmallBricks',
			order: 4,
			convert: 'Lrok,Frok,Wrok,Bdrr,Arck,Crck,Nrck,Ybtl,Vcbp,Qcbp,Xbtl,Dbrk,Gbrk,Ibkb,Osmb'
		},
		{
			key: 'Zbkl',
			res: 'Ruins_LargeBricks',
			order: 5,
			convert: 'Lrok,Frok,Wrok,Bflr,Arck,Crck,Nrck,Ysqd,Vrck,Qrck,Xsqd,Drds,Grds,Irbk,Olgb'
		},
		{
			key: 'Ztil',
			res: 'Ruins_RoundTiles',
			order: 6,
			convert: 'Lrok,Frok,Wrok,Bflr,Arck,Crck,Nrck,Yrtl,Vstp,Qstp,Xrtl,Dgrs,Ggrs,Itbk,Osqt'
		},
		{
			key: 'Zgrs',
			res: 'Ruins_Grass',
			order: 7,
			convert: 'Lgrs,Fgrs,Wgrs,Bgrr,Agrs,Cgrs,Ngrs,Ygsb,Vgrt,Qgrt,Xgsb,Drds,Grds,Isnw,Ofsl'
		},
		{
			key: 'Zvin',
			res: 'Ruins_GrassDark',
			order: 8,
			convert: 'Lgrd,Fgrd,Wsnw,Bdsd,Agrd,Cvin,Nice,Ygsb,Vgrt,Qgrt,Xgsb,Drds,Grds,Isnw,Ofst'
		},
		{
			key: 'Zsan',
			res: 'Ruins_Sand',
			order: 9,
			convert: 'Ldrt,Fdrt,Wsnw,Bdsr,Adrt,Cpos,Nice,Yhdg,Vcrp,Qcrp,Xhdg,Dlav,Glav,Iice,Odtr'
		}
	]
};

module.exports = { TERRAINS, TILE_INDEX_LARGE, TILE_INDEX_SMALL };
