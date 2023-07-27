import { renderHeaderComponent } from './header-component.js';
import { goToPage, user } from '../index.js';

export function renderPostsUserPageComponent({ appEl, posts }) {
  console.log('Актуальный список постов:', posts);
  const postHtml = posts.map((post) => {
    return `<div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id=${post.user.id}>
              <img src=${post.user.imageUrl} class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src=${post.imageUrl}>
          </div>
          <div class="post-likes">
            <button data-post-id=${post.id} class="like-button" data-isLiked=${post.isLiked}>
              <img src="./assets/images/like-active.svg" class="like-button-img">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${post.createdAt}
          </p>
        </li>
      </ul>
    </div>`;
  });
  appEl.innerHTML = postHtml;
  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });
}
