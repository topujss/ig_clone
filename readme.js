// get all elements
const own_form = document.getElementById('post-add');
const msg = document.querySelector('.msg');
const main_post = document.querySelector('.main-post');
const editForm = document.querySelector('#edit-form');

const getAllPost = () => {
  let post = readLsData('ig_post');
  let list = '';

  if (!post) {
    main_post.innerHTML = `<div class="card shadow-sm text-center mt-3"><div class="card-body">No post found</div></div>`;
    return false;
  }

  post.reverse().map((data) => {
    list += `
    <div class="post-area mt-3">
      <div class="card">
        <div class="card-head">
          <div class="card-left">
            <img src="${data.apic}" alt="" />
            <span>${data.aname}</span>
          </div>
          <div class="card-right">
            <div class="dropdown">
              <a href="#" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><a href="#" class="dropdown-item text-info" data-bs-toggle="modal" data-bs-target="#edit-post" edit_id="${data.id}">edit</a></li>
                <li><a href="#" class="dropdown-item text-danger delete-post" delete_id="${data.id}">delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <img src="${data.ppic}" alt="" />
          <div class="card-icon-area">
            <div class="card-react">
              <i class="bi bi-heart-fill text-danger"></i> 1
              <i class="bi bi-chat"></i> 
              <i class="bi bi-send-fill"></i>
            </div>
            <div class="card-save">
              <i class="bi bi-bookmark"></i>
            </div>
          </div>
          <div class="react-count">
            <strong>294 Likes</strong>
          </div>
          <div class="react-content">
            <b>${data.aname}</b>
            <span>${data.pcont}</span>
          </div>
          <div class="react-time">
            <span>Just Now</span>
          </div>
          <hr />
          <div class="comment">
            <div class="comment-write">
              <i class="bi bi-emoji-smile"></i>
              <input type="text" placeholder="Add a comment..." />
            </div>
            <div class="comment-btn">
              <button type="submit" class="">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

  main_post.innerHTML = list;
};
getAllPost();

own_form.onsubmit = (e) => {
  e.preventDefault();

  // get form data by Object
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries()); // Got data as an object
  //Destructuring data from object to get data easier
  const { aname, apic, ppic, pcont } = Object.fromEntries(new FormData(e.target).entries());

  if (!aname || !apic || !pcont) {
    msg.innerHTML = alertFunction('All fields required!');
  } else {
    const id = randomId();

    const value = { ...data, id };
    createLsData('ig_post', value);
    e.target.reset();
    getAllPost();
  }
};

main_post.onclick = (e) => {
  /**
   * delete feature
   */
  if (e.target.classList.contains('delete-post')) {
    const deleteId = e.target.getAttribute('delete_id');

    if (confirm('Are you sure?') == true) {
      const postKey = readLsData('ig_post');

      const data_delete = postKey.filter((data) => data.id !== deleteId);

      updataLsData('ig_post', data_delete);

      getAllPost();
    }
  }

  /**
   * post edit feature
   */

  if (e.target.hasAttribute('edit_id')) {
    const id = e.target.getAttribute('edit_id');

    const allData = readLsData('ig_post');

    const data = allData.find((data) => data.id == id);

    editForm.innerHTML = `
    <div class="my-3">
      <label>Author name:</label>
      <input type="text" name="aname" value="${data.aname}" class="form-control" />
      <input type="hidden" name="id" value="${data.id}" class="form-control" />
    </div>
    <div class="my-3">
      <label>Author img:</label>
      <input type="text" name="apic" value="${data.apic}" class="form-control" />
    </div>
    <div class="my-3">
      <label>Post img:</label>
      <input type="text" name="ppic" value="${data.ppic}" class="form-control" />
    </div>
    <div class="my-3">
      <label>Post content:</label>
      <textarea
        class="form-control"
        name="pcont"
        maxlength="230"
        placeholder="No more than 230 characters"
      >${data.pcont}</textarea>
    </div>
    <div class="my-3 text-center">
      <button class="btn btn-primary w-75" type="submit">Submit Data</button>
    </div>`;
  }
};
getAllPost();

editForm.onsubmit = (e) => {
  e.preventDefault();

  const form_val = new FormData(e.target);
  const value = Object.fromEntries(form_val.entries());
  const { aname, apic, pcont, ppic, id } = value;

  let allData = readLsData('ig_post');

  const index = allData.findIndex((data) => data.id == id);

  allData[index] = { aname, apic, pcont, ppic, id };

  updataLsData('ig_post', allData);

  getAllPost();
};
