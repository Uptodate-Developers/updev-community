import {UniversalSocialauth} from 'universal-social-auth'
import axios, { AxiosInstance } from 'axios'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $Oauth:UniversalSocialauth;
  }
}
