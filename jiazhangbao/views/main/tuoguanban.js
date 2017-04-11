import React from 'react';
import {
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';
const org = [{
		"id": 1903,
		"name": "雨露托管",
		"address": "成都市成华区",
		"shortName": "",
		"logo": "jzbtgb4",
		"lng": 104.15602657280616,
		"lat": 30.645329318702043,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 4336.0
	}, {
		"id": 1942,
		"name": "川大家教雨露托管",
		"address": "成都市成华区",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.15590979308986,
		"lat": 30.645562342115102,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 4336.0
	}, {
		"id": 1881,
		"name": "翰文雅韵托管乐园",
		"address": "四川省成都市锦江区大观里3号附57附近",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.14419588923975,
		"lat": 30.623026354323084,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 6606.0
	}, {
		"id": 1886,
		"name": "托管家教",
		"address": "四川省成都市锦江区金沙江路",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.13045181493709,
		"lat": 30.634943666123903,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 7043.0
	}, {
		"id": 1857,
		"name": "卓越托管家教中心",
		"address": "四川省成都市锦江区大观里1-7号",
		"shortName": "",
		"logo": "8515045fdb264934abb92cd236c4ad84",
		"lng": 104.14151893882001,
		"lat": 30.61716037952034,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 7225.0
	}, {
		"id": 1900,
		"name": "艺梵托管",
		"address": "四川省成都市锦江区国槐路1000号",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.13780893706381,
		"lat": 30.616158077715937,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 7566.0
	}, {
		"id": 1910,
		"name": "时习托管中心",
		"address": "四川省成都市成华区双林北支路73附近",
		"shortName": "",
		"logo": "jzbtgb2",
		"lng": 104.1138331630025,
		"lat": 30.66384514425834,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 8047.0
	}, {
		"id": 1861,
		"name": "童星托管学校",
		"address": "经华南路25",
		"shortName": "",
		"logo": "e9a7954a4d014befb055eb838a47f39c",
		"lng": 104.11158739922755,
		"lat": 30.648809076002,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 8354.0
	}, {
		"id": 1860,
		"name": "托管美术",
		"address": "成都市锦江区",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.11241384029672,
		"lat": 30.626304928186876,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 9013.0
	}, {
		"id": 1929,
		"name": "华康益寿托管中心成都工作站",
		"address": "双林路388号富临大厦13层",
		"shortName": "",
		"logo": "jzbtgb4",
		"lng": 104.10000824120394,
		"lat": 30.66598852356999,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 9382.0
	}, {
		"id": 1920,
		"name": "优知教育托管中心",
		"address": "四川省成都市锦江区东怡街84",
		"shortName": "",
		"logo": "jzbtgb2",
		"lng": 104.11034773762378,
		"lat": 30.62153464377903,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 9425.0
	}, {
		"id": 1859,
		"name": "优教育托管中心",
		"address": "成都市锦江区",
		"shortName": "",
		"logo": "jzbtgb2",
		"lng": 104.11031180540338,
		"lat": 30.621573490702243,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 9426.0
	}, {
		"id": 1895,
		"name": "象牙塔学校阅读写作英语数学托管",
		"address": "成都市成华区",
		"shortName": "",
		"logo": "jzbtgb2",
		"lng": 104.10034959729772,
		"lat": 30.69065722510639,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 9917.0
	}, {
		"id": 1909,
		"name": "英语数学托管",
		"address": "成都市成华区",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.10034959729772,
		"lat": 30.69065722510639,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 9917.0
	}, {
		"id": 1866,
		"name": "思维文化艺术托管中心",
		"address": "四川省成都市锦江区琉璃路翡翠城四期七栋101",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.10225400497887,
		"lat": 30.617168149260834,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 10337.0
	}, {
		"id": 1948,
		"name": "思维数学双语托管呼吸作文幼小衔接布朗英语",
		"address": "四川省成都市成华区荆翠中路",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.11528841792865,
		"lat": 30.721272655294335,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 10405.0
	}, {
		"id": 1944,
		"name": "思维数学双语托管呼吸作文",
		"address": "四川省成都市成华区荆翠中路",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.11528841792865,
		"lat": 30.721272655294335,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 10405.0
	}, {
		"id": 1953,
		"name": "优贝思特学生托管中心龙华分部",
		"address": "四川省成都市龙泉驿区荷华东路",
		"shortName": "",
		"logo": "8b4870ee6bf143329a07e35794af17ae",
		"lng": 104.17630132816636,
		"lat": 30.568182970492146,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 10469.0
	}, {
		"id": 1905,
		"name": "小初托管",
		"address": "成都市锦江区",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.08615637024008,
		"lat": 30.652374142596827,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 10726.0
	}, {
		"id": 1923,
		"name": "快乐之家教育托管中心",
		"address": "成都市武侯区",
		"shortName": "",
		"logo": "jzbtgb2",
		"lng": 104.08779128626823,
		"lat": 30.63145563638797,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11015.0
	},{
		"id": 1892,
		"name": "隆盛品牌服饰托管机构",
		"address": "春熙路西段77号附7金开国际服装城B座4层6\/7",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.08161992741469,
		"lat": 30.66129787741921,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11123.0
	}, {
		"id": 1945,
		"name": "首韩木子托管",
		"address": "成都市锦江区青年路8号九龙广场F2",
		"shortName": "",
		"logo": "jzbtgb0",
		"lng": 104.07930229919894,
		"lat": 30.66322386591638,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11349.0
	}, {
		"id": 1864,
		"name": "金玉天成托管中心",
		"address": "顺城大街248号世界贸易中心B座28层",
		"shortName": "",
		"logo": "03b72401f35f4ed6a7704fb282adcabd",
		"lng": 104.07835907841347,
		"lat": 30.66938210927292,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11478.0
	}, {
		"id": 1877,
		"name": "春雨学生托管教育中心",
		"address": "成都市武侯区",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.08170077491059,
		"lat": 30.63241893569076,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11545.0
	}, {
		"id": 1872,
		"name": "龙娃娃课外辅导工作室托管班",
		"address": "成都市武侯区",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.07764941706058,
		"lat": 30.65142657793834,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11547.0
	}, {
		"id": 1912,
		"name": "喜阳阳托管中心",
		"address": "四川省成都市金牛区肖家村二巷88号金牛万达D组团",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.08232958876756,
		"lat": 30.693685050141347,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11657.0
	}, {
		"id": 1894,
		"name": "优拓托管",
		"address": "四川省成都市武侯区美领事馆美食区一环路南2段-14号",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.07730806096679,
		"lat": 30.638703449026142,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11787.0
	}, {
		"id": 1878,
		"name": "读书郎托管教育",
		"address": "成都市青羊区",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.07342738116368,
		"lat": 30.6715175991995,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 11971.0
	}, {
		"id": 1901,
		"name": "北站托管中心",
		"address": "站北东横街42号2附近",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.08276077541235,
		"lat": 30.70705291525823,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 12174.0
	}, {
		"id": 1882,
		"name": "少儿美术学生托管课外辅导",
		"address": "四川省成都市武侯区长寿路10号-6-、7",
		"shortName": "",
		"logo": "jzbtgb4",
		"lng": 104.07859263784606,
		"lat": 30.61908725587286,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 12306.0
	}, {
		"id": 1904,
		"name": "贝特托管",
		"address": "四川省成都市武侯区黉门街36号正成商翼306室",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.06738178508154,
		"lat": 30.652280939931597,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 12519.0
	}, {
		"id": 1925,
		"name": "四川省国投资产托管公司",
		"address": "上池北街2号农资大厦11层",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.06641161513076,
		"lat": 30.654812913414062,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 12595.0
	}, {
		"id": 1875,
		"name": "家教托管美术",
		"address": "成都市成华区",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.07927535003364,
		"lat": 30.710771053918965,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 12654.0
	}, {
		"id": 1911,
		"name": "优优托管中心",
		"address": "成都市武侯区",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.06359991888453,
		"lat": 30.644024377108593,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 12978.0
	}, {
		"id": 1867,
		"name": "托管小升初",
		"address": "成都市青羊区",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.06130025677899,
		"lat": 30.670376088697076,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 13115.0
	}, {
		"id": 1874,
		"name": "小学托管班",
		"address": "四川省成都市青羊区西胜街2号-附3",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.06100381596069,
		"lat": 30.668481306498137,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 13127.0
	}, {
		"id": 1907,
		"name": "多乐托管",
		"address": "四川省成都市武侯区紫竹北街91号",
		"shortName": "",
		"logo": "jzbtgb0",
		"lng": 104.06242313866646,
		"lat": 30.623119585461147,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 13611.0
	}, {
		"id": 1891,
		"name": "托管",
		"address": "西安北路31号川裕大厦5层",
		"shortName": "",
		"logo": "jzbtgb2",
		"lng": 104.05469771128065,
		"lat": 30.67594373558304,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 13808.0
	}, {
		"id": 1880,
		"name": "文通教育托管中心",
		"address": "西林巷18号华鑫园内",
		"shortName": "",
		"logo": "jzbtgb5",
		"lng": 104.05410482964406,
		"lat": 30.687093585067952,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14073.0
	}, {
		"id": 1863,
		"name": "英语托管",
		"address": "成都市武侯区",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.05950364575902,
		"lat": 30.617230307162096,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14088.0
	},{
		"id": 1937,
		"name": "非凡视界托管服务中心",
		"address": "中和街道学苑路83号",
		"shortName": "",
		"logo": "8e53e86a64c84d5b99fc22d6eb4e9620",
		"lng": 104.09870569821447,
		"lat": 30.560976472860183,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14580.0
	}, {
		"id": 1954,
		"name": "非凡视界学习视力双托管服务中心",
		"address": "成都市双流县",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.09861586766347,
		"lat": 30.5609142785103,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14591.0
	}, {
		"id": 1883,
		"name": "成都七彩糖婴幼儿托管中心",
		"address": "洞子口路333号蓝光花满庭",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.06680686955515,
		"lat": 30.72826532041617,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14637.0
	}, {
		"id": 1906,
		"name": "安馨托管",
		"address": "四川省成都市金牛区光荣西路67号-附3",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.04933482738608,
		"lat": 30.697861738514536,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14811.0
	}, {
		"id": 1927,
		"name": "四达资产托管物管小组",
		"address": "科园二路3号思达工业园A-5",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.04702618222544,
		"lat": 30.628923045239087,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14857.0
	}, {
		"id": 1916,
		"name": "巴学园托管中心",
		"address": "成都市金牛区",
		"shortName": "",
		"logo": "jzbtgb1",
		"lng": 104.05493127071324,
		"lat": 30.71344895555413,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14895.0
	}, {
		"id": 1908,
		"name": "金牛区托管",
		"address": "四川省成都市金牛区星辰路6号",
		"shortName": "",
		"logo": "jzbtgb3",
		"lng": 104.05282025276479,
		"lat": 30.709893927782005,
		"isIdentify": 0,
		"viewNum": 0,
		"distance": 14931.0
	}]


module.exports = {org}






























