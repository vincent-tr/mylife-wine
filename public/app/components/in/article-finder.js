'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import * as mui from 'material-ui';
import base from '../base/index';
import common from '../common/index';
import tabStyles from '../base/tab-styles';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  paperCriteria: {
    flex: 2,
    height: '100%',
    textAlign: 'center',
  },
  paperList: {
    flex: 4,
    height: '100%',
    textAlign: 'center',
  },
  criteriaTitle: {
    fontWeight: 'bold',
    width: 300,
    display: 'inline-block',
    textAlign: 'left'
  }
};

function renderArticleListHeader() {
  return (
    <mui.Paper>
      <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left', padding: 16, fontWeight: 'bold' }}>
        <div style={{ flex: 1 }}>Appelation</div>
        <div style={{ flex: 1 }}>Type de spiritueux</div>
        <div style={{ flex: 1 }}>Région</div>
        <div style={{ flex: 1 }}>Propriétaire récoltant</div>
      </div>
    </mui.Paper>
  );
}

function renderArticleListItem(article) {
  return (
    <base.SelectableListItem
      key={article.id}
      value={{ value: article.id }}
      primaryText={
        <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
          <div style={{ flex: 1 }}>{article.name}</div>
          <div style={{ flex: 1 }}><base.DataImage data={article.type.icon} style={{marginRight: 10}}/>{article.type.name}</div>
          <div style={{ flex: 1 }}><base.DataImage data={article.region.icon} style={{marginRight: 10}}/>{article.region.name}</div>
          <div style={{ flex: 1 }}>{article.owner}</div>
        </div>
      }/>
  );
}

class ArticleFinder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      type     : null,
      region   : null,
      articles : props.articles
    };

    this.criteria = { type: null, region: null };
  }

  componentWillReceiveProps(nextProps) {
    this.refreshArticles(nextProps.articles);
  }

  changeCriteria(newValues) {
    this.criteria = Object.assign({
      type: this.state.type,
      region: this.state.region
    }, newValues);

    this.setState(newValues);
    this.refreshArticles(this.props.articles);
  }

  refreshArticles(articles) {
    if(this.criteria.type) {
      articles = articles.filter(article => article.type.id === this.criteria.type);
    }
    if(this.criteria.region) {
      articles = articles.filter(article => article.region.id === this.criteria.region);
    }

    this.setState({ articles });
  }

  render() {
    const { types, regions, article, onArticleChange } = this.props;
    const { type, region, articles } = this.state;
    const typeChange = (event, index, value) => this.changeCriteria({ type: value });
    const regionChange = (event, index, value) => this.changeCriteria({ region: value });

    return (
      <div style={styles.container}>
        <mui.Paper style={styles.paperCriteria}>

          <table style={{tableLayout: 'fixed', width: '100%'}}>
            <tbody>
              <tr>
                <td><div style={styles.criteriaTitle}>Type de spiritueux</div></td>
                <td>
                  <common.ReferenceSelector
                    autoWidth={false}
                    style={{ width: 300 }}
                    id="type"
                    list={types}
                    value={type}
                    onChange={typeChange} />
                </td>
              </tr>
              <tr>
                <td><div style={styles.criteriaTitle}>Region</div></td>
                <td>
                  <common.ReferenceSelector
                    autoWidth={false}
                    style={{ width: 300 }}
                    id="region"
                    list={regions}
                    value={region}
                    onChange={regionChange} />
                </td>
              </tr>
            </tbody>
          </table>

        </mui.Paper>
        <mui.Paper style={styles.paperList}>
          <div style={{ height: '100%'}}>
            {renderArticleListHeader()}
            <div style={{ position: 'relative', height: 'calc(100% - 50px)' }}>
              <base.SelectableList style={Object.assign({}, tabStyles.scrollable, { position: 'absolute', padding: 0, height: '100%', width: '100%' })}
                                   selectedNode={{value: article}}
                                   selectedValueChanged={(obj) => onArticleChange(obj.value)}>
                {articles.map(renderArticleListItem)}
              </base.SelectableList>
            </div>
          </div>
        </mui.Paper>
      </div>
    );
  }
}

ArticleFinder.propTypes = {
  regions         : PropTypes.arrayOf(PropTypes.object),
  types           : PropTypes.arrayOf(PropTypes.object),
  articles        : PropTypes.arrayOf(PropTypes.object),
  article         : PropTypes.string,
  onArticleChange : PropTypes.func.isRequired
};

export default ArticleFinder;
