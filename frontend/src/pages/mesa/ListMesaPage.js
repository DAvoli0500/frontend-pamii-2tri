import './ListMesaPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Mesa';

class ListMesaPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-mesa"></div>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);

        // buscando as mesas
        const mesas = this.fetchMesas() || [];
        
        // renderizando as mesas no HTML
        this.renderMesas(mesas);
    }

    fetchMesas() {
        return [
            {
                "id": 1,
                "qtd_cadeiras": 4
            },
            {
                "id": 2,
                "qtd_cadeiras": 2
            },
            {
                "id": 3,
                "qtd_cadeiras": 6
            }
        ]
    }

    renderMesas(mesas) {
        const container = this.querySelector(".list-mesa");

        // SE MESA VAZIA, MOSTRAR MENSAGEM AO USUÁRIO
        if (mesas.length === 0) {
            container.innerHTML = '<p> Nenhuma mesa encontrada </p>'
            return;
        }
        
        const mesaItems = mesas.map(mesa => `
            <ion-item>
                <ion-label>
                    <h2 style="display: flex; align-items: center; gap: 8px;">
                        <ion-icon
                            name="people"
                            color="primary"
                            style="flex-shrink: 0;"
                        ></ion-icon>
                        <span>Mesa ${mesa.id}</span>
                    </h2>
                    <p>${mesa.qtd_cadeiras} cadeiras</p>
                </ion-label>

                <ion-buttons slot="end">
                    <ion-button fill="clear" class="btn-edit" data-id="${mesa.id}">
                        <ion-icon slot="icon-only" name="create"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" class="btn-delete" data-id="${mesa.id}">
                        <ion-icon slot="icon-only" name="trash" color="danger"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-item>
        `).join('');

        container.innerHTML = `
            <ion-list>
                ${mesaItems}
            </ion-list>
        `;

        // adicionando eventos aos botões
        this.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.btn-edit').dataset.id;
                window.location.href = `#/mesa/editar/${id}`;
            });
        });

        this.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.btn-delete').dataset.id;
                this.deleteMesa(id);
            });
        });
    }

    deleteMesa(id) {
        console.log('Excluir mesa:', id);
    }
}

customElements.define('list-mesa-page', ListMesaPage);