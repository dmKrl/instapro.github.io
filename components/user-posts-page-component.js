import { renderHeaderComponent } from './header-component.js';
import { goToPage } from '../index.js';
import { POSTS_PAGE } from '../routes.js';
import { postTodoLike, postTodoDisLike } from '../api.js';
import formatDistance from 'date-fns/formatDistance';
import { ru } from 'date-fns/locale';

export function renderPostsUserPageComponent({ appEl, posts, token }) {
  console.log('Актуальный список постов:', posts);
  const postHtml = posts
    .map((post) => {
      return `<li class="post">
          <div class="post-image-container">
            <img class="post-image" src=${post.imageUrl}>
          </div>
          <div class="post-likes">
            <button data-post-id=${post.id} class="like-button" data-is-Liked=${
        post.isLiked
      }>
            ${
              post.isLiked
                ? `<img src="./assets/images/like-active.svg" data-is-Liked=${post.isLiked} class="like-button-img" data-post-id=${post.id}>`
                : `<img src="./assets/images/like-not-active.svg" data-is-Liked=${post.isLiked} class="like-button-img" data-post-id=${post.id}>`
            }
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
          ${formatDistance(new Date(), new Date(post.createdAt), {locale: ru})} назад
          </p>
        </li>`;
    })
    .join('');
  const appHtml = `<div class="page-container">
      <div class="header-container"></div>
      <div class="post-header" data-user-id=${posts[0].user.id}>
      <img src=${posts[0].user.imageUrl} class="post-header__user-image-item">
      <div class="post-header-text">
          <p class="post-header__user-name">${posts[0].user.name}</p>
          <p class="post-header__user-name">Количество постов: ${posts.length}</p>
      </div>
  </div>
      <ul class="posts">
      ${postHtml}
      </ul>
    </div>`;
  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });

  const buttonLike = document.querySelectorAll('.like-button');
  for (const buttonEl of buttonLike) {
    buttonEl.addEventListener('click', () => {
      const id = buttonEl.dataset.postId;
      if (buttonEl.dataset.isLiked === 'false') {
        console.log('у кнопки фолс');
        postTodoLike({ id, token }).then(() => {
          goToPage(POSTS_PAGE);
        });
      }
      if (buttonEl.dataset.isLiked === 'true') {
        console.log('// у кнопки тру');
        postTodoDisLike({ id, token }).then(() => {
          goToPage(POSTS_PAGE);
        });
      }
    });
  }
}
