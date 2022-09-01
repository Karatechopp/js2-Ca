export function createLoginModal(loggedIn) {
  if (!loggedIn) {
    const loginModal = document.querySelector(".create-loginmodal");

    loginModal.innerHTML = `<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" id="loginModalLabel">Log in</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="modal-message"></div>
            <form class="d-flex flex-column bd-highlight mb-3">

                <input placeholder="Username" type="text" id="username" class="username-input mt-2">

                <input placeholder="Password" id="password" class="password-input mt-2">

            </form>
        </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" type="submit" class="submit btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>`;
  }
}
