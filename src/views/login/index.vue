<template>
  <div class="sky-login">
    <van-image src="//yun.yang143.cn/2020/07/01/591aa29490f8b.svg"
      fit="cover" />

    <van-form @submit="onSubmit">
      <van-field v-model="cellphone"
        type="number"
        name="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请输入正确的手机号', validator: isMobilePhone }]" />

      <div style="margin: 16px;">
        <van-button round
          block
          type="info"
          native-type="submit">
          获取验证码
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
import { sendCaptcha } from '@/api/auth'
import VueRouter from 'vue-router'

//yun.yang143.cn/2020/07/01/591aa29490f8b.svg
//yun.yang143.cn/2020/07/01/62e033579d8ef.svg

@Component({ components: { Captcha } })
export default class SkyLogin extends Vue {
  cellphone = ''
  password = ''
  isSmsVisible: boolean = false

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

  async onSubmit(values: any) {
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
