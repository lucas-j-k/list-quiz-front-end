import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Import components
import Keyboard from './components/Keyboard';
import Prompt from './components/Prompt';
import Header from './components/Header';
import ResultsPanel from './components/ResultsPanel';
import Strikes from './components/Strikes';
import Menu from './components/Menu';
import ControlBar from './components/ControlBar';
import ErrorScreen from './components/ErrorScreen';

//import dummy data for dev testing:
import dummyData from './dummydata';

//Set the api endpoint
const apiRoot = "https://list-quiz-api.herokuapp.com";


class App extends Component {
  constructor(props){
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      title: "List Quiz",
      currentList: [],
      masterLists: [],
      currentListName: "",
      showMenu:true,
      running: false,
      activeItem: {},
      alphabet:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
      currentGuess:"",
      completedWord: false,
      results:[],
      errorCount:{
        current:3,
        max:4
      },
      variations:[
        {
          'name':'Remove Consonants',
          'value':'2'
        },
        {
          'name':'Remove Vowels',
          'value':'3'
        }
      ],
      apiError:{
        showScreen:false,
        code: ""
      },
      keyboardLayout:{
        top:["q","w","e","r","t","y","u","i","o","p",],
        middle:["a","s","d","f","g","h","j","k","l",],
        bottom:["z","x","c","v","b","n","m",]
      }
    }
  }
  componentDidMount() {
      let endpoint = apiRoot + "/api/list";
      fetch(endpoint)
      .then((response)=>{
        return response.json();
      })
      .then((lists)=>{
        this.setState({
          masterLists: lists
        })
      })
      .catch((error)=>{
        this.setState({
          apiError:{
            showScreen: true
          }
        })
      })
    }
    fetchList(listEndpoint, entriesEndpoint){
      var listData = fetch(listEndpoint).then(function(response){
         return response.json()
      });
      var entriesData = fetch(entriesEndpoint).then(function(response){
         return response.json()
      });
      var combinedResponse = {"list":{},"entries":{}};
      Promise.all([listData, entriesData]).then(function(data){
      combinedResponse["list"] = data[0];
      combinedResponse["entries"] = data[1];
      return combinedResponse;
      })
      .then((data) => {
        this.setState({
          currentList: data,
          activeIndex: 0,
          activeItem: data.entries[0],
          apiError:{
            showScreen: false
          },
          showMenu: false,
          running: true,
          currentGuess: data.entries[0].mutatedText,
          currentListName: data.list.name,
          results: [],
          errorCount:{
            current:3,
            max:3
          }
      })
    }
    )
    .catch((error)=>{
      this.setState({
        apiError:{
          showScreen: true
        }
      })
    })

    }
    nextQuestion(index){
      let nextQuestionObject = this.state.currentList.entries[index];
      this.setState({
        activeItem:nextQuestionObject,
        activeIndex:index,
        currentGuess: nextQuestionObject.mutatedText
      })
    }
    toggleMenu(bool){
      //Only hide menu if the quiz has started, to avoid being able to close the menu when it first loads up.
      if(this.state.running){
        this.setState({
          showMenu: bool
        })
      }
    }
    checkLetter(letter){
      let correctText = this.state.activeItem.originalText.toLowerCase();
      let correctTextArray = [...this.state.activeItem.originalText];
      let completedWord = false;
      let errors = this.state.errorCount;
      let newIndex = this.state.activeIndex;
      let nextQuestionObject = this.state.activeItem;
      let currentMutatedText = [...this.state.currentGuess];
      let currentResults = this.state.results;
      let updatedGuess = correctTextArray.map((originalLetter, index)=>{
        if(letter === originalLetter.toLowerCase()){
          return correctTextArray[index]
        } else {
          return currentMutatedText[index]
        }
      }).join("");
      if(correctText.indexOf(letter)<0){
        errors.current -= 1;
      }
      //Check the current guess against correct text to determine if we need to move to next word. Or, if the error count has reached max, move on anyway. Pass a comparison result to the component to tell it whether the answer was guessed
      if(updatedGuess.toLowerCase() === this.state.activeItem.originalText.toLowerCase() || errors.current <= 0){
        newIndex += 1;
        let wasAnswerCorrect = updatedGuess.toLowerCase() === this.state.activeItem.originalText.toLowerCase();
        currentResults.push({
          text: this.state.activeItem.originalText,
          wasCorrect: wasAnswerCorrect
        });
        completedWord = true;
        nextQuestionObject = this.state.currentList.entries[newIndex];
        this.setState({
          activeItem: nextQuestionObject,
          activeIndex: newIndex,
          currentGuess: nextQuestionObject.mutatedText,
          results: currentResults,
          errorCount:{
            current:3,
            max:3
          }
        })
      } else {
      this.setState({
        currentGuess: updatedGuess,
        completedWord: completedWord,
        errorCount: errors
      })
    }
  }
  render() {
    let nextIndex = this.state.activeIndex + 1;
    return (
      <div className="container">
        <ErrorScreen apiError={this.state.apiError} />
        <Menu
          fetchList={this.fetchList}
          showMenu={this.state.showMenu}
          masterLists={this.state.masterLists}
          toggleMenu={this.toggleMenu}
          running={this.state.running}
          title={this.state.title}
          currentListName={this.state.currentListName}
          variations={this.state.variations}
        />
        <ControlBar title={this.state.title} toggleMenu={this.toggleMenu} currentListName={this.state.currentListName} />
        <Prompt currentGuess={this.state.currentGuess} />
        <Strikes strikes={this.state.errorCount.current} />
        <Keyboard alphabet={this.state.alphabet} checkLetter={this.checkLetter} layout={this.state.keyboardLayout} />
        <ResultsPanel results={this.state.results} />
      </div>
    );
  }
}

export default App;
