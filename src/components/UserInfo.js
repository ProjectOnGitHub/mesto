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
  setUserInfo({ userName, userJob }) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
  }

  setUserAvatar({ userAvatar }) {
    this._userAvatarElement.src = userAvatar;
  }
}
