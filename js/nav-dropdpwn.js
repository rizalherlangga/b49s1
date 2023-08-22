let dropdownOpen = false ;

function dropdownMenu () {
    let dropdown = document.getElementById("dropdown")

    if (!dropdownOpen) {
        dropdown.style.display = "block";
        dropdownOpen = true;
      } else {
        dropdown.style.display = "none";
        dropdownOpen = false;
      }
}