import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  public contato: any = {};
  public create: boolean;
  public msg: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  addContato(contato) {
    let localArrayContato = [];
    // Create id
    contato.id = Date.now();
    // Get Contato on localstorage
    const localStringContato = localStorage.getItem('ls-contatos');
    const list = JSON.parse(localStringContato);
    if ( list && list.length > 0 ) {
      localArrayContato = list;
    }
    // Add Contato on Array
    localArrayContato.push(contato);
    // Add Contato on localstorage
    const listaToString = JSON.stringify(localArrayContato);
    localStorage.setItem('ls-contatos', listaToString);
    this._alertMessage(false, 'Created contato.');
  }

  updateContato(contato) {
    // Get Contato on localstorage
    const localStringContato = localStorage.getItem('ls-contatos');
    const localArrayContato = JSON.parse(localStringContato);
    // Update list contato
    localArrayContato.map(item => {
      if (item.id === contato.id) {
        item = contato;
      }
    });
    // Update Contato on localstorage
    const listaToString = JSON.stringify(localArrayContato);
    localStorage.setItem('ls-contatos', listaToString);
    this._alertMessage(false, 'Updated contato.');
  }

  _alertMessage(isError, message) {
    if (isError) {
      this.msg = { error: true, message };
    } else {
      this.msg = { error: false, message };
    }
    // It's going to close in 3s.
    setTimeout(() => {
      // Clear message
      this.msg = {};
      if (isError === false) {
        // It's ok! redirect to contatos
        this.router.navigate(['/', 'contatos']);
      }
    }, 3000);
  }

  _checkIfExistContato(form) {
    // Get contatos localstorage
    const localStringContato = localStorage.getItem('ls-contatos');
    // Convert in Array Object
    const localArrayContato = JSON.parse(localStringContato);
    // Filter and check if contato exist
    if (localArrayContato) {
      const listFilter = localArrayContato.filter(item => {
        if (item.contato === form.contato || item.telefone === form.telefone || item.id === form.id ) {
          return true;
        }
      });
      // Check if contato return in filter
      if (listFilter.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  _findContatoLocalStorage(id) {
    const localStringContato = localStorage.getItem('ls-contatos');
    const localArrayContato = JSON.parse(localStringContato);
    const getContato = localArrayContato.filter(item => {
      if (item.id === id) {
        return true;
      }
    });
    if (getContato.length > 0) {
      return getContato[0];
    } else {
      return null;
    }
  }

  onSubmit(form: NgForm) {
    const { id, contato } = form.value;

    // Force value false if value === ''
    if (form.value.active === '') {
      form.value.active = false;
    }

    // CHECK Contato
    const check = this._checkIfExistContato(form.value);

    // UPDATE
    if (this.create === false && id && contato ) {
      if (check === true) {
        this.updateContato(form.value);
      } else {
        // ERROR contato not found
        this._alertMessage(true, 'Contato not found!');
      }
    } else {
    // CREATE
      if (check === false) {
        this.addContato(form.value);
      } else {
        // ERROR contato really exist
        this._alertMessage(true, 'Contato really exist!');
      }
    }
  }

  ngOnInit() {
    // Get params in URL
    const { id } = this.route.snapshot.params;

    if (id === 'new') {
      this.create = true;
    } else {
      const findContato = this._findContatoLocalStorage( Number(id) );
      // Find contato
      if (findContato) {
        this.contato = findContato;
        this.create = false;
      } else {
      // Redirect if id not exists
        this.router.navigate(['/', 'contatos', 'new']);
      }
    }
  }

}
