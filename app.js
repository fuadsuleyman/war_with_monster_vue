function getRamdomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function checkWinner(playerHealth, monsterHealth) {
//   console.log("Entered to checkwinner");
//   if (playerHealth < 0 && monsterHealth < 0) {
//     return "DRAW";
//   } else if (monsterHealth <= 0 && playerHealth > 0) {
//     return gameStatus = "YOU WIN";
//   } else if (playerHealth <= 0 && monsterHealth > 0) {
//     return gameStatus = "YOU LOSE";
//   } else {
//     return "Game contiunie";
//   }
// }

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
      //   gameStatus: "Game contiunie",
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    disableStyle() {
      return this.currentRound % 3 !== 0;
    },
    getGameStatus() {
      return this.gameStatus;
    },
  },
  watch: {
    playerHealth(value) {
      console.log(`inside watch playerHealth ${value}`);
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "It is a draw!";
      } else if (value <= 0) {
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      console.log(`inside watch monsterHealth ${value}`);
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "It is a draw!";
      } else if (value <= 0) {
        this.winner = "Player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      console.log(`remainder: ${this.currentRound % 3}`);
      let onceAttackValue = getRamdomValue(5, 12);
      this.monsterHealth -= onceAttackValue;
      this.addLogs("player", "attack", onceAttackValue);
      this.attackPlayer();

      //   this.gameStatus = checkWinner(this.playerHealth, this.monsterHealth);
    },
    attackPlayer() {
      let monsterAttackValue = getRamdomValue(8, 15);
      this.playerHealth -= monsterAttackValue;
      this.addLogs("monster", "attack", monsterAttackValue);
    },
    specialAttack() {
      this.currentRound++;
      console.log(`remainder: ${this.currentRound % 3}`);
      let specialAttackValue = getRamdomValue(10, 25);
      this.monsterHealth -= specialAttackValue;
      this.addLogs("player", "special-attack", specialAttackValue);
      this.attackPlayer();

      //   this.gameStatus = checkWinner(this.playerHealth, this.monsterHealth);
    },
    healPlayer() {
      this.currentRound++;

      let healValue = getRamdomValue(8, 15);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogs("player", "heal", healValue);
      this.attackPlayer();

      //   this.gameStatus = checkWinner(this.playerHealth, this.monsterHealth);
    },
    addLogs(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    surrender() {
      this.winner = "Monster";
      this.addLogs("player", "surrend", "0");
    },
  },
});

app.mount("#game");
