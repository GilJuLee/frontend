import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import StickyHeader from "../components/StickyHeader";
import Container from "@mui/material/Container";
import CustomizedButton from "../components/CustomizedButton";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";

export default function StickyHeadTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMiddleScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "member_num", label: "번호", minWidth: 10 },
    { id: "member_id", label: "아이디", minWidth: 10 },
    { id: "member_pw", label: "패스워드", minWidth: 10 },
    { id: "member_name", label: "이름", minWidth: 20 },
    { id: "member_tel", label: "휴대폰번호", minWidth: 20 },
    { id: "member_addr", label: "주소", minWidth: 30 },
    { id: "pw_question", label: "비밀번호 질문", minWidth: 10 },
    { id: "pw_answer", label: "비밀번호 답", minWidth: 10 },
    { id: "signup_date", label: "가입날짜", minWidth: 10 },
  ];

  let paddingTop = "200px";
  if (isSmallScreen) {
    paddingTop = "140px";
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const navigate = useNavigate();

  //배열 시작
  const [memberList, setMemberList] = useState([]);

  const [info, setInfo] = useState({
    board_num: 0,
    member_id: "",
    board_title: "",
    board_date: "",
  });

  const getList = () => {
    axios
      .post("http://localhost:8080/getMembers", {})
      .then((res) => {
        const { data } = res;
        setMemberList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleTableCellClick = (event, post) => {
    console.log(post);
    if (event.target.innerText === "수정") {
      axios
        .post("http://localhost:8080/selectMember", {
          member_id: post.member_id,
        })
        .then((res) => {
          if (res.data !== null) {
            alert("회원 정보가 수정되었습니다!");
          } else {
            alert("회원 정보 수정 실패!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else if (event.target.innerText === "삭제") {
      axios
        .post("http://localhost:8080/deleteMember", {
          member_id: post.member_id,
        })
        .then((res) => {
          if (res.data === 1) {
            alert("회원 정보가 삭제되었습니다!");
            if (post.member_id === window.sessionStorage.getItem("id")) {
              if (window.localStorage.getItem("id") === post.member_id) {
                window.localStorage.clear();
              }
              window.sessionStorage.clear();

              navigate("/", { return: true });
            }
          } else {
            alert("회원 정보 삭제 실패!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    getList();
  });
  return (
    <div>
      <StickyHeader kind="고객관리" />
      <Container sx={{ paddingTop: { paddingTop } }}>
        <h2 style={{ display: "flex", alignItems: "center", color: "black" }}>
          <span style={{ marginRight: "auto" }}>넷플릭스 회원 목록</span>
        </h2>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ width: "100%", maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.board_num}
                      align={column.board_title}
                      style={{ minWidth: column.minWidth, textAlign: "center" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell style={{ width: 50, textAlign: "center" }}>
                    수정 및 삭제
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((post, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: "#dddddd",
                          },
                        }}
                        onClick={(event) => handleTableCellClick(event, post)}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={column.member_num}
                              align={column.board_title}
                              style={{ textAlign: "center" }}
                            >
                              {post[column.id]}
                            </TableCell>
                          );
                        })}
                        <TableCell style={{ width: 20 }}>
                          <Box sx={{ display: "flex" }}>
                            <Box sx={{ mr: 1 }}>
                              <CustomizedButton
                                onClick={handleTableCellClick}
                                label="수정"
                              ></CustomizedButton>
                            </Box>
                            <CustomizedButton
                              onClick={handleTableCellClick}
                              label="삭제"
                            ></CustomizedButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={memberList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </div>
  );
}
