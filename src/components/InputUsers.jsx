import React from 'react';
import './styles.css';

// const suggestions = [
//     "Oksana",
//     "Iana",
//     "Nikolay",
//     "Lyubov",
//     "Anatoliy",
//     "Yaroslav",
//     "Vladislav",
//     "Alex",
//     "Denis",
//     "Anton"
// ]

let suggestions = [];

class InputUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userName: "",
            suggestions: suggestions
        }
    }

    componentDidMount() {
        fetch('https://eh7o6sp0pa.execute-api.us-east-1.amazonaws.com/dev/user/' + this.state.userName)
            .then(response => response.json())
            .then(suggestions => this.setState({ suggestions: suggestions }));
      }
    

    onChange = (e) => {
        const userName = e.target.value;
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().indexOf(userName.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userName: e.target.value
        });
    };

    onClick = (e) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userName: e.target.innerText
        });
    };

    onKeyDown = (e) => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userName: filteredSuggestions[activeSuggestion]
            });
        }

        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }

        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userName
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userName) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = true;
            } else {
                suggestionsListComponent = false;
            }
        }

        return (
            <div className="inputUser">
                <input type="text"
                    value={userName}
                    onChange={onChange}
                    onKeyDown={onKeyDown} />
                {suggestionsListComponent === true &&
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion) {
                                className = "suggestionActive";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            )
                        })}
                    </ul>
                }
                {suggestionsListComponent === false &&
                    <div className="noSuggestions">
                        <em>No suggestions</em>
                    </div>
                }
            </div>
        )
    }
}

export default InputUsers;