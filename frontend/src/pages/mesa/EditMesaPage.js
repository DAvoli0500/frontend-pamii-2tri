import './EditMesaPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Mesa';

class EditMesaPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);

        // Pega o ID da URL/hash
        const hash = window.location.hash;
        const match = hash.match(/\/mesa\/edit(?:ar)?\/(\d+)/);
        const id = match ? parseInt(match[1]) : 1;

        // Mock das mesas (igual ao ListMesaPage)
        const mesas = [
            { id: 1, qtd_cadeiras: 4 },
            { id: 2, qtd_cadeiras: 2 },
            { id: 3, qtd_cadeiras: 6 }
        ];
        const mesa = mesas.find(m => m.id === id) || mesas[0];

        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-mesa">
                    <ion-list>
                        <ion-item>
                            <ion-input type="number" name="qtd_cadeiras"
                            label="Quantidade de Cadeiras" label-placement="floating" value="${mesa.qtd_cadeiras}" required>
                            </ion-input>
                        </ion-item>
                    </ion-list>
                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                        Salvar Mesa
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

customElements.define('edit-mesa-page', EditMesaPage);