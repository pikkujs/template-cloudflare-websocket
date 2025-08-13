import { CloudflareWebSocketHibernationServer } from '@pikku/cloudflare'
import { setupServices } from './setup-services.js'
import { CloudflareEventHubService } from '@pikku/cloudflare'
import { SingletonServices } from '.././types/application-types.js'
import { createSessionServices } from './services.js'

export class WebSocketHibernationServer extends CloudflareWebSocketHibernationServer {
  private singletonServices: SingletonServices | undefined

  protected async getParams() {
    if (!this.singletonServices) {
      this.singletonServices = await setupServices(this.env)
      this.singletonServices.eventHub = new CloudflareEventHubService(
        this.singletonServices.logger,
        this.ctx
      )
    }
    return {
      singletonServices: this.singletonServices,
      createSessionServices,
    }
  }
}
