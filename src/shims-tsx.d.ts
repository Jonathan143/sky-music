import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  namespace skyMusic {
    interface music {
      id: string | number
      name: string
      picUrl: string
      singer: string
      alName?: string
    }

    interface playList {
      tracks: Array<skyMusic.music>
      coverImgUrl?: string
      name?: string
      playCount?: string | number
      id?: string | number
      subscribedCount?: string | number
      shareCount?: string | number
      commentCount?: string | number
      description?: string
    }
  }
}
