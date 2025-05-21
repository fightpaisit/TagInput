import React, {
  Component,
  FocusEventHandler,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styles from "./TagInput.module.css";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  onInputChange?: (value: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  seperator?: string[];
}

interface TagInputState {
  inputValue: string;
  isFocused: boolean;
}

const RemoveIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{ marginLeft: "6px", cursor: "pointer", display: "block" }}
  >
    <path
      d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

class TagInput extends Component<TagInputProps, TagInputState> {
  static defaultProps: any = {
    placeholder: "Add tag...",
    allowDuplicates: false,
    className: "",
    inputProps: {},
    tagClassName: "",
    seperator: ["Enter", ","],
  };

  constructor(props: TagInputProps) {
    super(props);
    this.state = {
      inputValue: "",
      isFocused: false,
    };
  }

  getMaxTag = () => {
    const { maxTags } = this.props;
    return maxTags !== undefined && maxTags <= 0 ? 0 : maxTags;
  };

  getCanAddMoreTag = () => {
    const { tags } = this.props;
    const effectiveMaxTags = this.getMaxTag();
    return effectiveMaxTags === undefined || tags.length < effectiveMaxTags;
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.setState({ inputValue: newValue });
    if (this.props.onInputChange) {
      this.props.onInputChange(newValue);
    }
  };

  addTag = (tagValue: string) => {
    const newTag = tagValue.trim();
    if (!newTag) return;
    const { tags, onChange, allowDuplicates } = this.props;
    if (
      !allowDuplicates &&
      tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())
    ) {
      this.setState({ inputValue: "" });
      return;
    }
    if (this.getCanAddMoreTag() || this.getMaxTag() === undefined) {
      onChange([...tags, newTag]);
      this.setState({ inputValue: "" });
    }
  };

  handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { seperator, tags } = this.props;
    const { inputValue } = this.state;
    if (seperator!.includes(e.key)) {
      e.preventDefault();
      this.addTag(inputValue);
      return;
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault();
      this.removeTag(tags[tags.length - 1]);
    }
  };

  removeTag = (tagToRemove: string) => {
    const { tags, onChange } = this.props;
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) this.props.onFocus(e);
  };

  handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const { inputValue } = this.state;
    if (inputValue.trim() !== "") {
      this.addTag(inputValue);
    }
    if (this.props.onBlur) this.props.onBlur(e);
  };

  render() {
    const { tags, placeholder } = this.props;
    const { inputValue, isFocused } = this.state;
    const maxTags = this.getMaxTag();
    const canAddMoreTags = this.getCanAddMoreTag();
    const currentPlaceholder =
      !canAddMoreTags && maxTags !== undefined
        ? `Max ${maxTags} tags`
        : placeholder;

    return (
      <div
        className={`${styles.tagInputContainer} ${
          isFocused ? styles.focused : ""
        }`}
      >
        {tags.map((tag, index) => (
          <div key={`${tag}-${index}`} className={`${styles.tagItem}`}>
            <span>{tag}</span>
            <button
              type="button"
              className={styles.removeTagButton}
              onClick={(e) => {
                this.removeTag(tag);
              }}
            >
              <RemoveIcon />
            </button>
          </div>
        ))}
        {canAddMoreTags && (
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder={currentPlaceholder}
            className={styles.tagInputField}
            disabled={!canAddMoreTags && maxTags !== undefined}
            aria-label="Add a new tag"
          />
        )}
      </div>
    );
  }
}

export default TagInput;
