import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import sortBy from 'lodash/sortBy';
import { orange500, green500, blue500, purple500 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';


class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            featuredUsers: [], // storing state of users as featuredUsers instead of having to "pull from db" again.
            colors: {
                1: orange500,
                2: green500,
                3: blue500,
                4: purple500
            },
            sortType: 1,
            categories: [],
            checkedCategories: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateCheck = this.updateCheck.bind(this);
    }

    componentDidMount() {
        fetch('/api/users').then(res => {
            return res.json();
        }).then((users) => {
            let categories = [];
            users.forEach((user) => {
                if (!categories.includes(user.category)) {
                    categories.push(user.category);
                }

            });
            this.setState({users, categories});
        });
    }

    handleChange(e, key, sortType) {
        let users = this.sortUsers(sortType, this.state.users);
        this.setState({sortType, users});
    }

    sortUsers(sortType, users) {
        let sortedUsers = sortBy(users, ['name']);
        switch(sortType) {
            case 1: {
                return users;
            }
            case 2: {
                return sortedUsers
            }
            case 3: {
                return sortedUsers.reverse();
            }
            default: {
                return users;
            }
        }
    }

    updateCheck(e, isChecked) {
        let { checkedCategories } = this.state;
        if (isChecked) {
            checkedCategories.push(e.target.name);
        } else {
            checkedCategories.splice(checkedCategories.indexOf(e.target.name), 1);
        }


        fetch('/api/users').then(res => {
            return res.json();
        }).then((users) => {
            let filteredUsers = this.sortUsers(this.state.sortType, users);

            if (checkedCategories.length) {
                filteredUsers = filteredUsers.filter((user) => {return checkedCategories.includes(user.category)});
            }
            this.setState({users: filteredUsers, checkedCategories});
        });
    }

    fetchUsers() {
        fetch('/api/users').then(res => {
            return res.json();
        }).then((users) => {
            let categories = [];
            users.forEach((user) => {
                if (!categories.includes(user.category)) {
                    categories.push(user.category);
                }
            })
            if (!this.state.categories.length) {
                this.setState({categories});
            }
            return users;
        });
    }

    render() {
        const { users, colors, categories } = this.state;

        let userCards = users.map((user, i) => {
            return (
                <Card className="listing-card" key={`card-user-${i}`}>
                    <CardHeader>
                        <h2><Avatar className="card-avatar" backgroundColor={colors[user.priority]} size={30}/>{user.name}</h2>
                    </CardHeader>
                    <Divider />                   
                    <CardText>
                        <p>Category: <span className="user-category">{user.category}</span></p>
                        <p>Age: <span className="user-age">{user.age}</span></p>
                    </CardText>
                </Card>
            )
        });

        let categoryOptions = categories.map((cat, i) => {
            return (
                <ListItem key={`category-filter-${i}`}leftCheckbox={<Checkbox onCheck={this.updateCheck} name={cat} />} primaryText={cat} />
            )
        });

        const style = {
            height: 300,
            width: 300,
            margin: 20,
            display: 'inline-block',
            paddingTop: 10,
        };

        return (
            <div className="listings-container">
                <div className="listing-filters">
                <Paper style={style} zDepth={1}>
                    <SelectField
                        floatingLabelText="Sort By:"
                        value={this.state.sortType}
                        onChange={this.handleChange}
                        fullWidth
                    >
                        <MenuItem value={1} primaryText="Featured" />
                        <MenuItem value={2} primaryText="A-Z" />
                        <MenuItem value={3} primaryText="Z-A" />
                    </SelectField>
                    <Divider />
                    <List>
                        <Subheader>Filter Categories</Subheader>
                        {categoryOptions}
                    </List>
                </Paper>
                </div>
                <div className="listing-card-container">
                    {userCards}
                </div>
            </div>
        );
    }
}


export default Listings;
