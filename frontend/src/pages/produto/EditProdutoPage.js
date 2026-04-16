import './EditProdutoPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Produto';


class EditProdutoPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);

        // Pega o ID da URL/hash
        const hash = window.location.hash;
        const match = hash.match(/\/mesa\/editar\/(\d+)/) || hash.match(/\/produto\/edit(?:ar)?\/(\d+)/);
        const id = match ? parseInt(match[1]) : 1;

        // Mock dos produtos (igual ao ListProdutoPage)
        const produtos = [
            { id: 1, dsc_produto: "Macarronada", valor_unit: 20.99, status: 1 },
            { id: 2, dsc_produto: "Feijoada", valor_unit: 30.99, status: 0 },
            { id: 3, dsc_produto: "Strogonoff de Frango", valor_unit: 25.99, status: 1 }
        ];
        const produto = produtos.find(p => p.id === id) || produtos[0];

        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-produto">
                    <ion-list>
                        <ion-item>
                            <ion-input type="text" name="dsc_produto"
                            label="Descrição do Produto" label-placement="floating" value="${produto.dsc_produto}" required>
                            </ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input type="number" step="0.01" name="valor_unit"
                            label="Valor Unitário" label-placement="floating" value="${produto.valor_unit}" required>
                            </ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label>Ativo</ion-label>
                            <ion-toggle slot="end" name="status" ${produto.status ? 'checked' : ''}></ion-toggle>
                        </ion-item>
                    </ion-list>
                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                        Salvar Produto
                        </ion-button>
                        <ion-button expand="block" color="danger" id="btn-cancelar">
                        Cancelar
                        </ion-button>
                    </div>
                </form>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);
        this.querySelector('#btn-cancelar').addEventListener('click', () => window.history.back());
    }
}

customElements.define('edit-produto-page', EditProdutoPage);