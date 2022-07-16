// Author: Sai Chand Kolloju

import { Favorite } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookDetail from "../../components/books/BookDetail";
import { toast } from "material-react-toastify";

function UserBookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isUserFavorite, setIsUserFavorite] = useState(false);
  const navigate = useNavigate();
  const onFavoriteHandler = async () => {
    axios
      .post(
        "/api/users/favorites",
        {
          bookId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("LIBRIYA_TOKEN"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsUserFavorite(!isUserFavorite);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`);
        const { success, book, message } = data;
        if (success) {
          setBook(book);
        } else {
          toast.error(message, { toastId: "UserBookDetail-Diff" });
          navigate("/dashboard");
        }
      } catch (err) {
        if (err.name === "AxiosError") {
          const {
            data: { message },
          } = err.response;
          toast.error(message, { toastId: "UserBookDetail-GetBook" });
          navigate("/dashboard");
        }
      }
    })();
  }, [id]);

  return (
    <BookDetail book={book}>
      <Button variant="contained" color="secondary">
        Add To Cart
      </Button>
      <IconButton onClick={onFavoriteHandler}>
        <Favorite
          size="small"
          sx={{
            color: isUserFavorite ? "#e74c3c" : "#7f8c8d",
          }}
        />
      </IconButton>
    </BookDetail>
  );
}
export default UserBookDetail;