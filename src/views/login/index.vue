<template>
  <div class="sky-login">
    <van-image src="//yun.yang143.cn/2020/07/01/591aa29490f8b.svg"
      fit="cover" />

    <van-form @submit="onSubmit">
      <van-field v-model="cellphone"
        type="number"
        name="cellphone"
        placeholder="手机号"
        :rules="rules.cellphone" />
      <van-field v-model="password"
        type="password"
        name="password"
        placeholder="密码"
        :rules="rules.password" />

      <div style="margin: 16px;">
        <van-button round
          block
          type="info"
          color="linear-gradient(to right, #F067B4,#9025fc)"
          native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

    <van-popup class="sky-login__popup-sms"
      position="right"
      v-model="isSmsVisible">
      <captcha :phone="cellphone" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import isMobilePhone from 'validator/lib/isMobilePhone'
import Captcha from './components/Captcha.vue'
import { sendCaptcha, login } from '@/api/auth'
import VueRouter from 'vue-router'
import { Mutation } from 'vuex-class'

//yun.yang143.cn/2020/07/01/591aa29490f8b.svg
//yun.yang143.cn/2020/07/01/62e033579d8ef.svg

@Component({ components: { Captcha } })
export default class SkyLogin extends Vue {
  @Mutation('updateUserInfo') updateUserInfo!: Function

  cellphone = ''
  password = ''
  isSmsVisible: boolean = false
  rules = {
    cellphone: [
      {
        required: true,
        message: '请输入手机号'
      },
      {
        required: true,
        message: '请输入正确的手机号',
        validator: this.isMobilePhone
      }
    ],
    password: [
      { required: true, message: '请输入密码' },
      {
        validator: this.verifyPassword,
        message: '包含字母、数字、符号中至少两种；密码长度为6-16位'
      }
    ]
  }

  @Watch('$route.query', { immediate: true })
  queryChanged(query: any) {
    if (query.isSmsVisible === 'true') {
      if (this.cellphone) {
        this.isSmsVisible = true
      } else {
        this.$router.replace({})
      }
    }
  }

  isMobilePhone(phone: number) {
    return isMobilePhone(phone + '', 'zh-CN')
  }
  verifyPassword(password: string) {
    const REG = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
    return REG.test(password)
  }

  async onSendCaptchaClick() {
    try {
      const loading = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '验证码发送中'
      })
      await sendCaptcha(this.cellphone)
      loading.clear()
      this.$router.push({
        query: { isSmsVisible: 'true', ...this.$route.query }
      })
      this.$toast('发送成功')
    } catch (error) {}
  }

  async onSubmit(values: any) {
    try {
      const loading = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      })
      const { profile }: any = await login(this.cellphone, this.password)
      this.updateUserInfo(profile)
      loading.clear()
      this.$toast('登录成功')

      const fullPath: any = this.$route.query.fullPath
      this.$router.replace(fullPath ? { path: fullPath } : { name: 'home' })
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.sky-login {
  &__popup-sms {
    width: 100%;
    height: 100%;
  }
}
</style>
