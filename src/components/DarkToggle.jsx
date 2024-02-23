export default function DarkToggle(props) {
  return (
    <section className="darkMode">
      <label className="inline-flex items-center cursor-pointer m-2">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={props.darkToggle}
        />
        <div
          className="relative w-11 h-6 bg-gray-400 
                peer-focus:outline-none rounded-full dark:bg-gray-700 
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span className="ms-3 text-sm font-medium dark:text-grey-900">
          {!props.darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </label>
    </section>
  );
}
