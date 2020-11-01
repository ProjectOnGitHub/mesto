export default class UserInfo {
  constructor({name, job}) {
      this._name = name;
      this._job = job;
      this._profileName = document.querySelector('.popup__input_name');
      this._profileJob = document.querySelector('.popup__input_job')
  }

  getUserInfo () {
      this._profileName.value = this._name.textContent;
      this._profileJob.value = this._job.textContent;
  }

  setUserInfo () {
      this._name.textContent = this._profileName.value;
      this._job.textContent = this._profileJob.value;
  }
}
