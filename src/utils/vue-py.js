import { pinyin } from './pyconst.js';
export default {
    chineseToPinYin: function(l1) {
        // var l2 = l1;
        var l2 = l1.length;
        console.log("工具库l2", l2);
        var I1 = '';
        var reg = new RegExp('[a-zA-Z0-9]');
        for (var i = 0; i < l2; i++) {
            var val = l1.substr(i, 1);
            var name = this.arraySearch(val, pinyin);
            if (reg.test(val)) {
                I1 += val;
            } else if (name !== false) {
                I1 += name;
            }
        }
        I1 = I1.replace(/ /g, '-');
        while (I1.indexOf('--') > 0) {
            I1 = I1.replace('--', '-');
        }
        // console.log("工具库i1", I1);
        return I1;
    },
    arraySearch: function(l1) {
        for (var name in pinyin) {
            if (pinyin[name].indexOf(l1) !== -1) {
                return this.ucfirst(name);
            }
        }

        return false;
    },
    ucfirst: function(l1) {
        if (l1.length > 0) {
            var first = l1.substr(0, 1).toUpperCase();
            var spare = l1.substr(1, l1.length);
            return first + spare;
        }
    }
};
//   三、使用获取拼音

// import vPinyin from '@/constant/vue-py.js';

// this.addTrafficHub.pinYin = vPinyin.chineseToPinYin(this.addTrafficHub.hubName);
// //    四、获取首字母

// let SX = '';
// for (var i = 0; i < this.addTrafficHub.pinYin.length; i++) {
//     var c = this.addTrafficHub.pinYin.charAt(i);
//     if (/^[A-Z]+$/.test(c)) {
//         SX += c;
//     }
// }
// this.addTrafficHub.suoXie = SX;
// //  完整事例及效果

// inputPY() {
//     this.addTrafficHub.pinYin = vPinyin.chineseToPinYin(this.addTrafficHub.hubName);
//     let SX = '';
//     for (var i = 0; i < this.addTrafficHub.pinYin.length; i++) {
//         var c = this.addTrafficHub.pinYin.charAt(i);
//         if (/^[A-Z]+$/.test(c)) {
//             SX += c;
//         }
//     }
//     this.addTrafficHub.suoXie = SX;
// },