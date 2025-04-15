<?php

namespace Fir\Pinecones\[CAMEL]\Blocks;

use Log1x\AcfComposer\Block;
use Log1x\AcfComposer\Builder;
use Fir\Lib\Utils\Helpers;
use Fir\Lib\Utils\GlobalFields as GlobalFields;
use Fir\Lib\Utils\Blocks;
use Fir\Lib\Utils\Images;
use Illuminate\Support\Facades\Vite;

use function Roots\bundle;


class [CAMEL] extends Block
{
    /**
     * The block name.
     *
     * @var string
     */
    public $name = '[NAME]';

    /**
     * The block description.
     *
     * @var string
     */
    public $description = '[DESC]';

    /**
     * The block view.
     *
     * @var string
     */
    public $view = '[CAMEL].view';

    /**
     * The block category.
     *
     * @var string
     */
    public $category = 'fir/blocks';

    /**
     * The block icon.
     *
     * @var string|array
     */
    public $icon = '[DASHICON]';

    /**
     * The block keywords.
     *
     * @var array
     */
    public $keywords = [];

    /**
     * The block post type allow list.
     *
     * @var array
     */
    public $post_types = [];

    /**
     * The parent block type allow list.
     *
     * @var array
     */
    public $parent = [];

    /**
     * The default block mode.
     *
     * @var string
     */
    public $mode = 'preview';

    /**
     * The ancestor block type allow list.
     *
     * @var array
     */
    public $ancestor = [];

    /**
     * The default block alignment.
     *
     * @var string
     */
    public $align = '';

    /**
     * The default block text alignment.
     *
     * @var string
     */
    public $align_text = '';

    /**
     * The default block content alignment.
     *
     * @var string
     */
    public $align_content = ''; 
    
    /**
    * The Block Version
    *
    * @var string
    */
    public $blockVersion = 2;

    /**
    * The API Version
    *
    * @var string
    */
    public $apiVersion = 3;

    /**
     * The Allowed Blocks
     *
     * @var array
     */
    public $allowed = [];


    /**
     * The supported block features.
     *
     * @var array
     */
    //working on getting this to work public $supports =  Blocks::getBlockSupports($block, $blockSettings);
    public $supports = [
        'align' => true,
        'align_content' => false,
        'full_height' => false,
        'anchor' => true,
        'mode' => false,
        'multiple' => true,
        'jsx' => true,
        'color' => false, // using acf pallete + ACF field instead
        'background' => false, // using acf pallete + ACF field instead
        'html' => true,
        'reusable' => true,
        'customClassName' => true,
        'typography' => true,
        'position' => false,
    ];

    /**
     * The block styles.
     *
     * @var array
     */
    public $styles = [

    ];

    /**
     * The block preview example data.
     *
     * @var array
     */
    public $example = [
        'style' => 'light',
        'options' => [
            'flip_horizontal' => false,
            'hide_component' => false
        ]
    ];

    /**
     * The block template.
     *
     * @var array
     */
    public $template = [

    ];

    /**
     * The Uses Context.
     *
     * @var array
     */

    public $uses_context = ['acf/fields', 'fir/block'];

    /**
     * Data to be passed to the block before rendering.
     *
     * @return array
     */
    public function with(): array
    {
        $options = get_field('options') ?: $this->example['options'];

        $options['animations'] = $options['animations'] ?? [
            'animationsItem' => '',
            'animationsComponent' => ''
        ];

        return [
            //'class' => $class, * For future updates to incorporate block settings from the gutenberg Supports
            'textColor' => get_field('textColor') ?: '',
            'backgroundColor' => get_field('backgroundColor') ?: '',
            'padding' => $options['padding'] ?: '',
            'margin' => $options['margin'] ?: '',
            'hide' => $options['hide_component'] ?: '',
            'options' => $options,
            'preview' => $this->preview,
            'allowed' => esc_attr(wp_json_encode( $this->allowed ))
        ];
    }

    public function fields()
    {        
        $[CAMEL]= Builder::make('[CAMEL]');
        $[CAMEL]
            ->addFields(GlobalFields::getFields('color', 'textColor', 'Text Color'))
            ->addFields(GlobalFields::getFields('color', 'backgroundColor', 'Background Color'))

            ->addGroup('options', [
                'label' => 'Options',
                'layout' => 'block'
            ])

            ->addFields(GlobalFields::getFields('padding'))
            ->addFields(GlobalFields::getFields('margin'))
            ->addFields(GlobalFields::getFields('animation'))
            ->addFields(GlobalFields::getFields('customizations'))
            ->addFields(GlobalFields::getFields('hideComponent'))
            ->endGroup();

        return $[CAMEL]->build();
    }

    /**
     * Assets enqueued when rendering the block.
     */
    public function assets(array $block): void
    {
        wp_enqueue_style('fir/[CAMEL]', Vite::asset('fir/Pinecones/[CAMEL]/style.css'),[], false);

        if(!is_admin() && WP_ENV === 'production') {
            wp_enqueue_script('fir/[CAMEL]', Vite::asset('fir/Pinecones/[CAMEL]/script.js'),[], false, []);
        }
    }
}
