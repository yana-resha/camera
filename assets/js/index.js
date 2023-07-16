

document.addEventListener('DOMContentLoaded', async () => {
    let btn = document.querySelector('.btn-photo');
    let textBlock = document.querySelector('.text-container');
    let uploudInput = document.querySelector('.upload-photo-input');
    let modal = document.querySelector('.modal');
    let myModal = new bootstrap.Modal(modal, {
      keyboard: false
    });
    let modalContent = modal.querySelector('.modal-body');
    $('.upload-photo-input').fileinput('<button class="btn btn-primary bg-gradient btn-photo">Сделать фото (v2)</button>');

  function successPosition(pos) {
      let crd = pos.coords;
      return `<div>Ваше место положение: <br> Широта: ${crd.latitude}<br> Долгота: ${crd.longitude} <br> Плюс-минус ${crd.accuracy} метров</div>`;
  }
  
  var getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
  };

  navigator.mediaDevices
  .getUserMedia({video:true})
  .then((stream) => {

    getPosition()
        .then((position) => {
          
        }).catch(() => {
          showErrorModal();
        });

    
  }).catch(() => {
    showErrorModal();
  });
  
  function successUpload(position, file) {
    let text = successPosition(position);
    textBlock.innerHTML = text;
    textBlock.innerHTML += `<div>
    Имя файла: ${file.name} <br>
    Размер файла: ${file.size} байт
    </div>`;
  }

  function showErrorModal() {
    modalContent.innerHTML = '';
    modalContent.innerHTML = 'Для работы с приложением необходимо разрешить доступ к камере и геопозиции!';
    myModal.show();
  }
  
  function openInput() {
    uploudInput.click();
  }

  uploudInput.addEventListener('change', (event) => {
    textBlock.innerHTML = '';
    let file = event.target.files[0];
    if (file) {
      textBlock.innerHTML = 'Подождите, получаем координаты';
      getPosition()
      .then((position) => {
        textBlock.innerHTML = '';
        successUpload(position, file);
      }).catch((error) => {
        showErrorModal();
      })
  }
    
});
  

/*     btn.addEventListener('click', (event) => {
        textBlock.innerHTML = '';
        
        
          navigator.mediaDevices
          .getUserMedia({video:true})
          .then((stream) => {
  
            getPosition()
                .then((position) => {
                  openInput();
                }).catch(() => {
                  
                })
  
            
          }).catch(() => {
            showErrorModal();
          });

          
    }); */
})