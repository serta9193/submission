$ ('#enter').click (function () {
  const upCard = Number ($ ('[id="upCard"]').val ());
  const card1 = Number ($ ('[id="card1"]').val ());
  const card2 = Number ($ ('[id="card2"]').val ());
  const card3 = Number ($ ('[id="card3"]').val ());
  const card4 = Number ($ ('[id="card4"]').val ());
  let pHand = [card1, card2, card3, card4, 0];
  let dHand = [upCard, 0, 0, 0, 0];
  let handV = 0;
  let dealP = [4, 4, 4, 4, 4, 4, 4, 4, 4, 16];
  let canDeal = false;
  let rand = 0;
  let hValue = 0.0;
  let sValue = 0.0;
  let dValue = 0.0;
  let playerB = 0.0;
  let dealerB = 0.0;
  let playerW = 0.0;
  let playerL = 0.0;
  let dealerBJ = 0.0;
  let d17 = 0.0;
  let d18 = 0.0;
  let d19 = 0.0;
  let d20 = 0.0;
  let d21 = 0.0;
  let p16 = 0.0;
  let p17 = 0.0;
  let p18 = 0.0;
  let p19 = 0.0;
  let p20 = 0.0;
  let p21 = 0.0;
  let result = document.getElementById ('result');
  let sum = function (arr) {
    return arr.reduce (function (prev, current, i, arr) {
      return prev + current;
    });
  };

  if (upCard != 0) dealP[upCard - 1] -= 1;
  if (card1 != 0) {
    dealP[card1 - 1] -= 1;
    handV += 1;
  }

  if (card2 != 0) {
    dealP[card2 - 1] -= 1;
    handV += 1;
  }

  if (card3 != 0) {
    dealP[card3 - 1] -= 1;
    handV += 1;
  }

  if (card4 != 0) {
    dealP[card4 - 1] -= 1;
    handV += 1;
  }

  if (upCard == 0) {
    alert ('アップカードが選択されていません。');
    return false;
  }

  if (handV <= 1) {
    alert ('選択されたカードが2枚以下です。');
    return false;
  }

  if ((card1 == 0 || card2 == 0) && card4 >= 0) {
    alert ('選択されたカードが不正です。');
    return false;
  }

  for (var i = 0; i < dHand.length; i++) {
    if (dHand[i] == 1) dHand[i] = 11;
  }

  for (var i = 0; i < pHand.length; i++) {
    if (pHand[i] == 1) pHand[i] = 11;
  }

  for (var i = 0; i < 10 ** 6; i++) {
    for (var j = 1; j < 5; j++) {
      if (sum (dHand) >= 17) break;
      canDeal = false;

      while (!canDeal) {
        rand = Math.floor (Math.random () * 13);
        if (rand > 9) rand = 9;
        if (dealP[rand] != 0) canDeal = true;
      }

      dealP[rand] -= 1;
      if (rand == 0) rand = 10;
      dHand[j] = rand + 1;

      while (sum (dHand) >= 22) {
        for (var k = 0; k < 5; k++) {
          if (dHand[k] == 11) {
            dHand[k] = 1;
            break;
          }
        }
        if (k == 5) break;
      }
    }

    if (sum (dHand) == 17) d17 += 1;
    if (sum (dHand) == 18) d18 += 1;
    if (sum (dHand) == 19) d19 += 1;
    if (sum (dHand) == 20) d20 += 1;
    if (sum (dHand) == 21 && dHand[2] != 0) d21 += 1;
    if (sum (dHand) == 21 && dHand[2] == 0) dealerBJ += 1;
    if (sum (dHand) >= 22) dealerB += 1;

    dHand = [upCard, 0, 0, 0, 0];
    dealP = [4, 4, 4, 4, 4, 4, 4, 4, 4, 16];
    if (upCard != 0) dealP[upCard - 1] -= 1;
    if (card1 != 0) dealP[card1 - 1] -= 1;
    if (card2 != 0) dealP[card2 - 1] -= 1;
    if (card3 != 0) dealP[card3 - 1] -= 1;
    if (card4 != 0) dealP[card4 - 1] -= 1;

    for (var l = 0; l < dHand.length; l++) {
      if (dHand[l] == 1) dHand[l] = 11;
    }
  }

  d17 /= i;
  d18 /= i;
  d19 /= i;
  d20 /= i;
  d21 /= i;
  dealerBJ /= i;
  dealerB /= i;

  while (sum (pHand) >= 22) {
    for (var k = 0; k < 5; k++) {
      if (pHand[k] == 11) {
        pHand[k] = 1;
        break;
      }
    }
    if (k == 5) break;
  }

  if (sum (pHand) <= 16) {
    playerL += d17 + d18 + d19 + d20 + d21;
  } else if (sum (pHand) == 17) {
    playerL += d18 + d19 + d20 + d21;
  } else if (sum (pHand) == 18) {
    playerW += d17;
    playerL += d19 + d20 + d21;
  } else if (sum (pHand) == 19) {
    playerW += d17 + d18;
    playerL += d20 + d21;
  } else if (sum (pHand) == 20) {
    playerW += d17 + d18 + d19;
    playerL += d21;
  }

  sValue = dealerB + playerW - (playerL + dealerBJ);

  playerW = 0;
  playerL = 0;

  for (var i = 0; i < 10 ** 6; i++) {
    canDeal = false;

    while (!canDeal) {
      rand = Math.floor (Math.random () * 13);
      if (rand > 9) rand = 9;
      if (dealP[rand] != 0) canDeal = true;
    }

    dealP[rand] -= 1;
    if (rand == 0) rand = 10;
    pHand[handV] = rand + 1;

    while (sum (pHand) >= 22) {
      for (var k = 0; k < 5; k++) {
        if (pHand[k] == 11) {
          pHand[k] = 1;
          break;
        }
      }
      if (k == 5) break;
    }

    if (sum (pHand) <= 16) p16 += 1;
    if (sum (pHand) == 17) p17 += 1;
    if (sum (pHand) == 18) p18 += 1;
    if (sum (pHand) == 19) p19 += 1;
    if (sum (pHand) == 20) p20 += 1;
    if (sum (pHand) == 21) p21 += 1;
    if (sum (pHand) >= 22) playerB += 1;

    pHand = [card1, card2, card3, card4, 0];
    dealP = [4, 4, 4, 4, 4, 4, 4, 4, 4, 16];
    if (upCard != 0) dealP[upCard - 1] -= 1;
    if (card1 != 0) dealP[card1 - 1] -= 1;
    if (card2 != 0) dealP[card2 - 1] -= 1;
    if (card3 != 0) dealP[card3 - 1] -= 1;
    if (card4 != 0) dealP[card4 - 1] -= 1;

    for (var l = 0; l < pHand.length; l++) {
      if (pHand[l] == 1) pHand[l] = 11;
    }
  }

  p16 /= i;
  p17 /= i;
  p18 /= i;
  p19 /= i;
  p20 /= i;
  p21 /= i;
  playerB /= i;

  playerW =
    p18 * d17 +
    p19 * (d17 + d18) +
    p20 * (d17 + d18 + d19) +
    p21 * (d17 + d18 + d19 + d20);
  playerL =
    p16 * (d17 + d18 + d19 + d20 + d21) +
    p17 * (d18 + d19 + d20 + d21) +
    p18 * (d19 + d20 + d21) +
    p19 * (d20 + d21) +
    p20 * d21;

  if (handV == 4) playerW = 1 - playerB;

  hValue = dealerB + playerW - (playerL + dealerBJ + playerB);

  if (handV == 2) dValue = 2 * hValue;

  if (sValue >= hValue && (sValue >= dValue || dValue == 0))
    result.innerHTML = '推奨手 : <b>Stand</b> 期待値 ' + 10 * sValue;
  if (hValue >= sValue && (hValue >= dValue || dValue == 0))
    result.innerHTML = '推奨手 : <b>Hit</b> 期待値 ' + 10 * hValue;
  if (dValue >= sValue && dValue >= hValue && dValue != 0)
    result.innerHTML = '推奨手 : <b>Double down</b> 期待値 ' + 10 * dValue;

  console.log (upCard, card1, card2, card3, card4);
  console.log (playerB, playerL, playerW);
  console.log (p16, p17, p18, p19, p20, p21, playerB);
  console.log (sValue, hValue, dValue);
});

$ ('#reset').click (function () {
  $ ('#upCard').val (0);
  $ ('#card1').val (0);
  $ ('#card2').val (0);
  $ ('#card3').val (0);
  $ ('#card4').val (0);
  let result = document.getElementById ('result');
  result.innerHTML = '';
});
