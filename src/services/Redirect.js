/**
 * Classe para gerenciar o redirecionamento de rotas
 */
export class Redirect {
  constructor() {
    this.location = window.location
  }

  /**
   * Método responsável por fazer o recarregamento da página
   */
  reload = () => {
    return this.location.reload()
  }
}
