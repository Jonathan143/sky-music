<template>
  <div class="captcha">
    <h1>请输入验证码</h1>
    <p class="captcha__sub">验证码已发送到 <span>{{phone}}</span></p>
    <van-password-input class="captcha__input"
      :value="captcha"
      :length="4"
      :gutter="20"
      :mask="false"
      :focused="showKeyboard"
      @focus="showKeyboard = true" />

    <van-number-keyboard :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { verifyCaptcha } from '@/api/auth'

@Component
export default class LoginCaptcha extends Vue {
  @Prop({ required: true, type: [String, Number] }) phone!: string

  showKeyboard = false
  captcha = ''

  async onInput(key: string) {
    this.captcha = (this.captcha + key).slice(0, 4)
    if (this.captcha.length === 4 && this.phone) {
      try {
        const verifying = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '验证码校验中'
        })
        await verifyCaptcha(this.phone, this.captcha)
        verifying.clear()
        this.$toast('登录成功')

        const fullPath: any = this.$route.query.fullPath
        this.$router.replace(fullPath ? { path: fullPath } : { name: 'home' })
      } catch (error) {
        this.captcha = ''
      }
    }
  }

  onDelete() {
    this.captcha = this.captcha.slice(0, this.captcha.length - 1)
  }
}
</script>

<style lang="scss" scoped>
.captcha {
  & > h1 {
    font-size: 22px;
    font-weight: bold;
    margin-top: 20%;
    padding: 0 24px;
    color: $color-text-main;
  }
  &__sub {
    font-size: 13px;
    padding: 8px 24px 0;
    color: $color-text-sub;
    span {
      color: $color-text-main;
    }
  }

  .van-password-input {
    margin: 0 46px;
  }

  &__input {
    margin-top: 20%;
    & > li {
      border-bottom: 2px solid $color-border-1;
    }
  }
}
</style>
