// vee-validate 表单验证区域
import Vue from 'vue';
import VeeValidate, { Field } from 'vee-validate';
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (fiedld) => `${fiedld}必须与密码相同`
    },
    attributes: { //给效验的field 属性名映射中文名称
        phone: "手机号",
        captcha: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

//自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "请勾选协议"
});