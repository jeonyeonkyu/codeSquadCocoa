// https://programmers.co.kr/learn/courses/30/lessons/64061
// 게임개발자인 죠르디는 크레인 인형뽑기 기계를 모바일 게임으로 만들려고 합니다.
// 죠르디는 게임의 재미를 높이기 위해 화면 구성과 규칙을 다음과 같이 게임 로직에 반영하려고 합니다.
function solution(board, moves) {
  var result = [];
  var count = 0;
  for (var i = 0; i < moves.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board[j][(moves[i] - 1)] != 0) {
        result.push(board[j][(moves[i] - 1)]);
        board[j][(moves[i] - 1)] = 0;
        break;
      }
    }
  }
  for (var i = 0; i < result.length; i++) {
    if (result[i] == result[i - 1]) {
      result.splice(i - 1, 2);
      i = 0;
      count += 2;
    }
  }
  return count;
}