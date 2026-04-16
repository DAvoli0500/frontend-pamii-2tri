import './EditUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Usuario';


class EditUsuarioPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);

        // Pega o ID da URL/hash
        const hash = window.location.hash;
        const match = hash.match(/\/usuario\/edit(?:ar)?\/(\d+)/);
        const id = match ? parseInt(match[1]) : 1;

        // Mock dos usuários (igual ao ListUsuarioPage)
        const usuarios = [
            { id: 1, nome: "Diego Pires", usuario: "diego.pires", senha: "123abc@", perfil: 1 },
            { id: 2, nome: "João da Couves", usuario: "joao.couve", senha: "123abc@", perfil: 0 },
            { id: 3, nome: "Fulano da Silva", usuario: "fulano.silva", senha: "123abc@", perfil: 0 }
        ];
        const usuario = usuarios.find(u => u.id === id) || usuarios[0];

        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-usuario">
                <ion-list>
                    <ion-item>
                    <ion-input type="text" name="nome" label="Nome Completo" label-placement="floating" value="${usuario.nome}" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="text" name="usuario" label="Usuário" label-placement="floating" value="${usuario.usuario}" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="password" name="senha" label="Senha" label-placement="floating" value="${usuario.senha}" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-select name="perfil" label="Perfil" label-placement="floating" value="${usuario.perfil}">
                        <ion-select-option value="0">Administrador</ion-select-option>
                        <ion-select-option value="1">Atendente</ion-select-option>
                    </ion-select>
                    </ion-item>
                </ion-list>

                <div class="ion-padding">
                    <ion-button expand="block" type="submit" class="ion-margin-top">
                    <ion-icon name="checkmark-circle" slot="start" style="margin-right: 8px;"></ion-icon>
                    Salvar Usuário
                    </ion-button>
                    <ion-button expand="block" color="danger" id="btn-cancelar">
                    <ion-icon name="close-circle" slot="start" style="margin-right: 8px;"></ion-icon>
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

customElements.define('edit-usuario-page', EditUsuarioPage);