const apiEndpoint = "https://jsonplaceholder.typicode.com/users";
const display = document.querySelector("#display");
const input = document.querySelector("#input");

const getData = async () => {
  const res = await fetch(apiEndpoint);
  const data = await res.json();
  return data;
};

const displayData = async () => {
  let query = input.value; // Use input.value to get the current value of the input field
  const payload = await getData();

  let displayUsers = payload
    .filter((eventData) => {
      if (query === "") {
        return true; // If query is empty, return everything
      } else if (eventData.name.toLowerCase().includes(query.toLowerCase())) {
        return true; // If name includes the query, return this data
      }
      return false; // Otherwise, exclude this data
    })
    .map((object) => {
      const { name, username } = object;

      return `
        <div class="px-4 py-2 border w-full ml-6">
          <p class="text-lg font-bold">name: ${name}</p>
          <p class="font-semibold text-gray-600">username: ${username}</p>
        </div>
      `;
    })
    .join("");

  display.innerHTML = displayUsers;
};

displayData(); // Call displayData initially to load all data

input.addEventListener("input", displayData); // Use the function directly, since input event will automatically pass the event
