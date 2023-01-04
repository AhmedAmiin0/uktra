const movieInitialColumns = {
  title: {
    text: "",
    rules: [(v) => !!v || "Title is required"],
    label: "Title",
    name: "title",
  },
  description: {
    text: "",
    rules: [(v) => !!v || "Description is required"],
    label: "Description",
    name: "description",
  },
  thumbnail: {
    text: "",
    name: "thumbnail",
    rules: [
      (v) => {
        if (v.thumbnail === "") {
          return "Image is required";
        }
        if (v.thumbnail instanceof File) {
          if (
            v?.thumbnail?.type !== "image/jpeg" &&
            v?.thumbnail?.type !== "image/png"
          ) {
            return "Image must be a jpeg or png";
          }
          if (v?.thumbnail?.size > 1000000) {
            return "Image must be less than 1MB";
          }
        }
        return true;
      },
    ],
    label: "Thumbnail",
  },
  excerpt: {
    text: "",
    rules: [(v) => !!v || "Excerpt is required"],
    label: "Excerpt",
    name: "excerpt",
  },
  start_date: {
    text: "",
    rules: [(v) => !!v || "Start date is required"],
    label: "Start date",
    name: "start_date",
  },
  end_date: {
    text: "",
    rules: [(v) => !!v || "End date is required"],
    label: "End date",
    name: "end_date",
  },
};
export default movieInitialColumns;
