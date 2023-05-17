/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangle
 * @Date: 2022-03-11 17:13:28
 * @LastEditors: zhangle
 * @LastEditTime: 2023-05-04 14:28:07
 */
// 八号＝5磅(5pt)＝(5/72)*96＝6.67＝6px
// 七号＝5.5磅＝(5.5/72)*96＝7.3＝7px
// 小六＝6.5磅＝(6.5/72)*96＝8.67＝8px
// 六号＝7.5磅＝(7.5/72)*96＝10px
// 小五＝9磅＝(9/72)*96＝12px
// 五号＝10.5磅＝(10.5/72)*96＝14px
// 小四＝12磅＝(12/72)*96＝16px
// 四号＝14磅＝(14/72)*96＝18.67＝18px
// 小三＝15磅＝(15/72)*96＝20px
// 三号＝16磅＝(16/72)*96＝21.3＝21px
// 小二＝18磅＝(18/72)*96＝24px
// 二号＝22磅＝(22/72)*96＝29.3＝29px
// 小一＝24磅＝(24/72)*96＝32px
// 一号＝26磅＝(26/72)*96＝34.67＝34px
// 小初＝36磅＝(36/72)*96＝48px
// 初号＝42磅＝(42/72)*96＝56px
export const fontFamliyList = [
    {
        value: 'SIM_SUN',
        label: '宋体',
        alias: '宋体',
    },
    // {
    //     value: 'ST_SONG',
    //     label: '华文宋体',
    //     alias: '华文宋体',
    // }
]
export const fontSizeList = {
    '初号': {
        fontSize: 42,
        lineHeight: 49,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 244,
                'YYYY-MM-dd': 254,
                'YYYYMMdd': 202
            }
        }
    },
    '小初': {
        fontSize: 36,
        lineHeight: 42,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 210,
                'YYYY-MM-dd': 218,
                'YYYYMMdd': 175
            }
        }
    },
    '一号': {
        fontSize: 26,
        lineHeight: 31,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 152,
                'YYYY-MM-dd': 158,
                'YYYYMMdd': 126
            }
        }
    },
    '小一': {
        fontSize: 24,
        lineHeight: 28,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 140,
                'YYYY-MM-dd': 146,
                'YYYYMMdd': 116
            }
        }
    },
    '二号': {
        fontSize: 22,
        lineHeight: 26,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 128,
                'YYYY-MM-dd': 134,
                'YYYYMMdd': 106
            }
        }
    },
    '小二': {
        fontSize: 18, // 19
        lineHeight: 23,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 105,
                'YYYY-MM-dd': 134,
                'YYYYMMdd': 86
            }
        }
    },
    '三号': {
        fontSize: 16,
        lineHeight: 19,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 94,
                'YYYY-MM-dd': 97,
                'YYYYMMdd': 78
            }
        }
    },
    '小三': {
        fontSize: 15,
        lineHeight: 18,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 88,
                'YYYY-MM-dd': 91,
                'YYYYMMdd': 73
            }
        }
    },
    '四号': {
        fontSize: 14,
        lineHeight: 17,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 84,
                'YYYY-MM-dd': 85,
                'YYYYMMdd': 68
            }
        }
    },
    '小四': {
        fontSize: 12,
        lineHeight: 15,
        width: {
            dateWidth: {
                'YYYY/MM/dd': 71,
                'YYYY-MM-dd': 73,
                'YYYYMMdd': 58
            }
        }
    },
    // '五号': {
    //     fontSize: 10.5,
    //     lineHeight: 15,
    // },
    // '小五': {
    //     fontSize: 9,
    //     lineHeight: 15,
    // }
}