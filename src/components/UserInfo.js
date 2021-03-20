export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);

  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJob: this._userJobElement.textContent,
      userAvatar: this._userAvatarElement.src,

    };
  }
  setUserInfo({ userName, userJob, userAvatar }) {
    if (userName) this._userNameElement.textContent = userName;
    if (userJob) this._userJobElement.textContent = userJob;
    if (userAvatar) this._userAvatarElement.src = userAvatar;
  }
}
