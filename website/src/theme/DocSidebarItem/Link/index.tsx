import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';

import styles from './styles.module.css';

function parseBrandLabel(label: string): {name: string; brand?: string} {
  const match =
    label.match(/^(.+?)\s*\(([^)]+)\)\s*$/) ??
    label.match(/^(.+?)\(([^)]+)\)\s*$/);
  if (!match) {
    return {name: label};
  }
  return {name: match[1].trim(), brand: match[2].trim()};
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl, customProps} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const parsed = parseBrandLabel(label);
  const brandFromProps =
    typeof customProps?.brand === 'string' ? customProps.brand : undefined;
  const name = parsed.name;
  const brand = brandFromProps ?? parsed.brand;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <span className={styles.linkLabel}>
          <span className={styles.linkLabelText}>{name}</span>
          {brand ? <span className="azzas-sidebar-brand">{brand}</span> : null}
        </span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
