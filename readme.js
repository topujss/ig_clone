// get all elements
const own_form = document.getElementById('post-add');
const msg = document.querySelector('.msg');
const main_post = document.querySelector('.main-post');

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
                <li><a href="#" class="dropdown-item text-danger">Report</a></li>
                <li><a href="#" class="dropdown-item text-danger">Unfollow</a></li>
                <li><a href="#" class="dropdown-item text-secondary">Go to post</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body">
          <img src="${data.ppic}" alt="" />
          <div class="card-icon-area">
            <div class="card-react">
              <i class="bi bi-heart"></i>
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
	const { aname, apic, ppic, pcont } = Object.fromEntries(form_data.entries());

	if (!aname || !apic || !pcont) {
		msg.innerHTML = alertFunction('All fields required!');
	} else {
		createLsData('ig_post', data);
		e.target.reset();
		getAllPost();
	}
};
