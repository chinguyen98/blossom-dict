const changePasswordBtn = document.querySelector('.changePassword');
const changePasswordArea = document.querySelector('.changePasswordArea');

function showChangePasswordArea(e) {
	changePasswordArea.style.display = changePasswordArea.style.display === 'block' ? 'none' : 'block';
}

changePasswordBtn.addEventListener('click', showChangePasswordArea);