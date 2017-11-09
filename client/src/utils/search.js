import { Pipe, PipeTransform } from '@angular/core';

/**
 * filter archives by filename and tag
 */
@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  filterName(archives, name) {
    if (!name) {
      return archives;
    }
    return archives.filter((f) => f.name.toLowerCase().includes(name));
  }
  filterTags(archives, tags) {
    return archives.filter(
      (f) => tags.every(
        tag => f.tags.map(t => t.toLowerCase()).some(t => t.includes(tag))
      )
    );
  }
  transform(archives, searchStr) {
    const search = searchStr.toLowerCase();
    const tagSep = ':';
    const filename = search.includes(tagSep) ? search.split(tagSep, 2)[0] : search;

    let a = archives;
    const matched = search.match(/\:([^\:]+)?/g);
    if (matched) {
      const tags = matched.map(tag => tag.substr(1));
      a = this.filterTags(a, tags);
    }

    return this.filterName(a, filename);
  }
}
