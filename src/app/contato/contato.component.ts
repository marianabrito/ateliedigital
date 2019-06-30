import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  public contato: any = [];

  constructor() { }


  listContato() {
    const localContato = localStorage.getItem('ls-contato');
    this.contato = JSON.parse(localContato);
  }

  removeContato(id) {
    let contato = [];
    let updateContato = [];
    const localContato = localStorage.getItem('ls-contato');
    contato = JSON.parse(localContato);

    // Filter and return all diff by id
    updateContato = contato.filter(item => item.id !== id);

    // Save on localstorage
    localStorage.setItem('ls-contato', JSON.stringify(updateContato));

    // Update table
    this.listContato();
  }

  ngOnInit() {
    this.listContato();
  }

}
